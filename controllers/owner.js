const Owner = require("../models").Owner;
const Contry = require("../models").Country;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      countryId,
      userId,
    } = req.body;
    const oldUser = await Owner.findOne({
      where: { email, role: "owner" },
    });
    if (oldUser) {
      return res.json({ message: "alredy exist" });
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await Owner.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        phoneNumber,
        password: encryptedPassword,
        subscribe: false,
        lastPay: "",
        countryId,
        variant: "standart",
        role: "owner",
        userId,
      });
      const user = await Owner.findOne({
        where: { id: newUser.id },
        include: [
          {
            model: Contry,
          },
        ],
      });
      return res.json({ succes: true, data: user });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

//admin controllers

const getAll = async (req, res) => {
  const { search } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const count = await Owner.findAll();
  let queryObj = {};
  if (search) {
    queryObj["phoneNumber"] = {
      [Op.like]: "%" + String(search) + "%",
    };
  }
  try {
    const allUsers = await Owner.findAll({
      where: {
        ...queryObj,
      },
      offset: offset * limit,
      limit,
      include: [
        {
          model: Contry,
        },
      ],
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllOwnersOfUser = async (req, res) => {
  const { search, id } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const count = await Owner.findAll({ where: { userId: id } });
  let queryObj = {};
  if (search) {
    queryObj["phoneNumber"] = {
      [Op.like]: "%" + String(search) + "%",
    };
  }
  try {
    const allUsers = await Owner.findAll({
      where: {
        ...queryObj,
        userId: id,
      },
      offset: offset * limit,
      limit,
      include: [
        {
          model: Contry,
        },
      ],
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const user = await Owner.findOne({
        where: { id: id },
        include: [],
      });
      return res.json(user);
    } else return res.json(true);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateAccount = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await Owner.findOne({ where: { id } });
    await user.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changePaymentStatus = async (req, res) => {
  try {
    const { variant } = req.body;
    const { user_id } = req.user;
    const user = await Owner.findOne({ where: { id: user_id } });
    user.variant = variant;
    user.subscribe = true;
    user.lastPay = new Date();
    await user.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  getAll,
  getSingle,
  delateAccount,
  changePaymentStatus,
  getAllOwnersOfUser,
};
