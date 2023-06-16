const Admin = require("../models").Admin;
const Users = require("../models").User;
const Contry = require("../models").Country;
const Owner = require("../models").Owner;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const user = await Admin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email, role: user.role },
        process.env.TOKEN_KEY_ADMIN
      );
      user.token = token;
      user.save();
      return res.json({ data: user, succes: true });
    }

    const user1 = await Users.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user1 && (await bcrypt.compare(password, user1.password))) {
      const token = jwt.sign(
        { user_id: user1.id, email, role: user1.role },
        process.env.TOKEN_KEY_ADMIN
      );
      user1.token = token;
      user1.save();
      return res.json({ succes: true, data: user1 });
    }

    const owner = await Owner.findOne({
      where: { email: email.toLowerCase() },
    });

    if (owner && (await bcrypt.compare(password, owner.password))) {
      const token = jwt.sign(
        { user_id: owner.id, email, role: owner.role },
        process.env.TOKEN_KEY_ADMIN
      );
      owner.token = token;
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

    if (role == "admin") {
      const user = await Admin.findOne({ where: { id: 1 } });
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
    if (role == "admin") {
      const user = await Admin.findOne({ where: { id: 1 } });
      user.email = email;
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

const getMe = async (req, res) => {
  try {
    const { role, user_id } = req.user;
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id: 1 },
      });
      return res.json({ data: user, super: "admin", succes: true });
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
};
