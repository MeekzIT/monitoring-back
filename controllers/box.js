const { getSingle } = require("../services/item");
const { Op } = require("sequelize");

const Boxes = require("../models").Box;
const Items = require("../models").Item;
const Items2 = require("../models").Item2;
const Items3 = require("../models").Item3;
const BoxExpenses = require("../models").BoxExpenses;

function extractValues(inputArray) {
  const uniqueValues = new Set();

  inputArray.forEach((obj) => {
    obj.Items.forEach((item) => {
      for (const key in item) {
        uniqueValues.add(item["p2"]);
      }
    });
  });

  return Array.from(uniqueValues);

  return result;
}

const create = async (req, res) => {
  try {
    const { name, ownerId, geolocation } = req.body;

    const box = await Boxes.create({
      name,
      ownerId,
      geolocation,
    });

    return res.json({ succes: true, data: box });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, name, geolocation } = req.body;

    const box = await Boxes.findOne({ where: { id } });
    box.name = name;
    box.geolocation = geolocation;
    await box.save();
    return res.json({ succes: true, data: box });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllBoxesOfOwners = async (req, res) => {
  const { search, ownerId, boxId } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const count = await Boxes.findAll({ where: { ownerId: ownerId } });
  let queryObj = {};
  let queryObj1 = {};
  if (search) {
    queryObj["phoneNumber"] = {
      [Op.like]: "%" + String(search) + "%",
    };
  }
  if (boxId) {
    queryObj1["p5"] = {
      [Op.eq]: boxId,
    };
  }
  const allItems = await Items.findAll({
    where: {
      ...queryObj1,
      p2: {
        [Op.like]: "%" + String(ownerId) + "%",
      },
    },
  });
  const allItems2 = await Items2.findAll({
    where: {
      ...queryObj1,

      p2: {
        [Op.like]: "%" + String(ownerId) + "%",
      },
    },
  });
  const allItems3 = await Items3.findAll({
    where: {
      ...queryObj1,

      p2: {
        [Op.like]: "%" + String(ownerId) + "%",
      },
    },
  });

  try {
    await allItems
      .concat(allItems3)
      .concat(allItems2)
      .map(async (i) => await getSingle(Number(i.p2), i.p0));

    const boxItems1 = await Items.findAll({
      where: {
        ...queryObj1,

        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
      },
    });
    const boxItems2 = await Items2.findAll({
      where: {
        ...queryObj1,

        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
      },
    });
    const boxItems3 = await Items3.findAll({
      where: {
        ...queryObj1,

        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
      },
    });
    const allUsers = await Boxes.findAll({
      where: {
        ...queryObj,
        ownerId: ownerId,
      },
      offset: offset * limit,
      limit,
    });

    return res.json({
      paginateData: allUsers,
      items: boxItems1
        .map((i) => ({ ...i.dataValues, active: 1 }))
        .concat(boxItems3.map((i) => ({ ...i.dataValues, active: 3 })))
        .concat(boxItems2.map((i) => ({ ...i.dataValues, active: 2 }))),
      count: count.length,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

// ------------------------------------  box expenses

const createExpense = async (req, res) => {
  const { boxId, name, price, ownerId } = req.body;
  try {
    const boxExpense = await BoxExpenses.create({
      boxId,
      name,
      price,
      ownerId,
    });
    const allUsers = await BoxExpenses.findAll({
      where: {
        boxId: boxId,
      },
    });
    return res.json({ succes: true, data: allUsers });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editExpense = async (req, res) => {
  const { id, name, price } = req.body;
  try {
    const boxExpense = await BoxExpenses.findOne({ where: { id } });
    boxExpense.name = name;
    boxExpense.price = price;
    await boxExpense.save();
    const allUsers = await BoxExpenses.findAll({
      where: {
        boxId: boxExpense.boxId,
      },
    });
    return res.json({ succes: true, data: allUsers });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.body;
    const expenses = await BoxExpenses.findOne({ where: { id } });
    const allUsers = await BoxExpenses.findAll({
      where: {
        boxId: expenses.boxId,
      },
    });
    await expenses.destroy();
    return res.json({ succes: true, data: allUsers });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllBoxExpenses = async (req, res) => {
  const { boxId, ownerId } = req.query;

  try {
    const allUsers = await BoxExpenses.findAll({
      where: {
        boxId,
        ownerId,
      },
    });
    return res.json({ data: allUsers });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  edit,
  getAllBoxesOfOwners,
  createExpense,
  editExpense,
  destroy,
  getAllBoxExpenses,
};
