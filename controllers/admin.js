const Admin = require("../models").Admin;
const SuperAdmin = require("../models").SuperAdmin;
const Users = require("../models").User;
const Contry = require("../models").Country;
const Owner = require("../models").Owner;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { dateDifferenceInDays } = require("../services/item");

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, countryId } = req.body;
    const { role } = req.user;
    if (role == "superAdmin") {
      const oldUser = await Admin.findOne({
        where: { email },
      });
      if (oldUser) {
        return res.json({ message: "alredy exist" });
      } else {
        let encryptedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: encryptedPassword,
          countryId,
          role: "admin",
          block: false,
        });

        return res.json({ succes: true, data: admin });
      }
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const adminActivity = async (req, res) => {
  try {
    const { id, activity } = req.body;
    const { role } = req.user;

    if (role == "superAdmin") {
      const admin = await Admin.findOne({
        where: { id },
      });
      admin.block = activity;
      await admin.save();
      return res.json({ succes: true, data: admin });
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyAdmin = async (req, res) => {
  try {
    const { id, block } = req.body;
    const { role } = req.user;

    if (role == "superAdmin") {
      await Admin.destroy({
        where: { id },
      });
      return res.json({ succes: true });
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAdmins = async (req, res) => {
  try {
    const { role } = req.user;

    if (role == "superAdmin") {
      const admin = await Admin.findAll();
      return res.json({ succes: true, data: admin });
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const superAdmin = await SuperAdmin.findOne({
      where: { email: email.toLowerCase() },
    });
    if (superAdmin && superAdmin.dataValues.token === null) {
      if (superAdmin && (await bcrypt.compare(password, superAdmin.password))) {
        const token = jwt.sign(
          { user_id: superAdmin.id, email, role: superAdmin.role },
          process.env.TOKEN_KEY_ADMIN
        );
        superAdmin.token = token;
        superAdmin.save();
        return res.json({ data: superAdmin, succes: true });
      }
    } else {
      return res.json({ succes: false });
    }

    const user1 = await Users.findOne({
      where: { email: email.toLowerCase() },
    });
    if (user1 &&  user1.dataValues.token === null) {
      if (user1 && (await bcrypt.compare(password, user1.password))) {
        const token = jwt.sign(
          { user_id: user1.id, email, role: user1.role },
          process.env.TOKEN_KEY_ADMIN
        );
        user1.token = token;
        user1.save();
        return res.json({ succes: true, data: user1 });
      }
    } else {
      return res.json({ succes: false });
    }

    const owner = await Owner.findOne({
      where: { email: email.toLowerCase() },
    });
    if (owner && owner.dataValues.token === null) {
      if (owner && (await bcrypt.compare(password, owner.password))) {
        const token = jwt.sign(
          { user_id: owner.id, email, role: owner.role },
          process.env.TOKEN_KEY_ADMIN
        );
        owner.token = token;
        owner.save();
        return res.json({ succes: true, data: owner });
      }
    } else {
      return res.json({ succes: false });
    }
    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const claear = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const superAdmin = await SuperAdmin.findOne({
      where: { email: email.toLowerCase() },
    });
    if (superAdmin) {
      superAdmin.token = null;
      superAdmin.save();
      return res.json({ data: superAdmin, succes: true });
    }

    const user1 = await Users.findOne({
      where: { email: email.toLowerCase() },
    });
    if (user1) {
      user1.token = null;
      user1.save();
      return res.json({ succes: true, data: user1 });
    }

    const owner = await Owner.findOne({
      where: { email: email.toLowerCase() },
    });
    if (owner) {
      owner.token = null;
      owner.save();
      return res.json({ succes: true, data: owner });
    }

    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const logout = async (req, res) => {
  try {
    const { user_id, role } = req.user;

    // if (role == "admin") {
    //   const user = await Admin.findOne({ where: { id: user_id } });
    //   user.token = null;
    //   await user.save();
    //   return res.json({ succes: true });
    // } else
    if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({ where: { id: 1 } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "user") {
      const user = await Users.findOne({ where: { id: user_id } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({ where: { id: user_id } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changeSettings = async (req, res) => {
  try {
    const { user_id, role } = req.user;
    const { email, firstName, lastName } = req.body;
    // if (role == "admin") {
    //   const user = await Admin.findOne({ where: { id: 1 } });
    //   user.email = email;
    //   user.firstName = firstName;
    //   user.lastName = lastName;
    //   await user.save();
    //   return res.json({ succes: true });
    // } else
    if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({ where: { id: user_id } });
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "user") {
      const user = await Users.findOne({ where: { id: user_id } });
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({ where: { id: user_id } });
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changePassword = async (req, res) => {
  try {
    const { user_id, role } = req.user;
    const { password } = req.body;
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id: 1 },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({
        where: { id: user_id },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();

      return res.json({ succes: true });
    } else if (role == "user") {
      const user = await Users.findOne({
        where: { id: user_id },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();

      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({
        where: { id: user_id },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();

      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, role } = req.body;
    let encryptedPassword = await bcrypt.hash("test1234", 10);
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "user") {
      const user = await Users.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getMe = async (req, res) => {
  try {
    const { role, user_id } = req.user;
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "admin", succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "user", succes: true });
    } else if (role == "user") {
      const user = await Users.findOne({
        where: { id: user_id },
        include: [
          {
            model: Contry,
          },
        ],
      });
      return res.json({ data: user, super: "user", succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({
        where: { id: user_id },
      });
      const subscribeDayDifrence = dateDifferenceInDays(user.lastPay);
      console.log(
        subscribeDayDifrence,
        "--------subscribeDayDifrence-------------subscribeDayDifrence-----subscribeDayDifrence"
      );
      if (!subscribeDayDifrence) {
        user.subscribe = false;
        await user.save();
      }

      return res.json({ data: user, super: "owner", succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  login,
  logout,
  changeSettings,
  getMe,
  changePassword,
  create,
  adminActivity,
  destroyAdmin,
  getAdmins,
  resetPassword,
  claear
};
