const Owner = require("../models").Owner;
const Contry = require("../models").Country;
const Items = require("../models").Item;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function extractIds(inputArray, ownerId) {
  return inputArray.map((item) => {
    if (String(item.p2)?.length % 2 === 0) {
      const numberStr = item.p2.toString();
      console.log(numberStr);
      if (numberStr.slice(0, -4) == ownerId) return item.p2;
    }
    return null;
  });
}

function findLargestNumber(numbers) {
  if (numbers.length === 0) {
    return null; // Return null if the array is empty
  }

  let largest = numbers[0]; // Assume the first number is the largest

  for (let i = 1; i < numbers.length; i++) {
    if (typeof numbers[i] === "number" && numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  return Number(largest) + 2;
}

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
      deviceOwner,
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
        deviceOwner,
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

const generateUnicue = async (req, res) => {
  try {
    const { ownerId } = req.body;
    const user = await Owner.findOne({
      where: { id: ownerId },
    });
    const items = await Items.findAll();
    const result = await extractIds(items, ownerId);
    const newResult = await result.filter((i) => i !== null);
    const mapResult = await newResult.map((i) => Number(i));

    console.log(mapResult, "--------------------------------");

    const newId = findLargestNumber(newResult);

    return res.json({ succes: true, newId });
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
  generateUnicue,
};
