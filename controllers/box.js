const { getSingle } = require("../services/item");

const Boxes = require("../models").Box;
const Item = require("../models").Item;
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
  const { search, ownerId } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const count = await Boxes.findAll({ where: { ownerId: ownerId } });
  let queryObj = {};
  if (search) {
    queryObj["phoneNumber"] = {
      [Op.like]: "%" + String(search) + "%",
    };
  }
  try {
    const allBoxes = await Boxes.findAll({
      where: {
        ownerId: ownerId,
      },
      include: [
        {
          model: Item,
        },
      ],
    });
    const test = extractValues(allBoxes);
    await test.map(async (i) => await getSingle(i));
    const allUsers = await Boxes.findAll({
      where: {
        ...queryObj,
        ownerId: ownerId,
      },
      offset: offset * limit,
      limit,
      include: [
        {
          model: Item,
        },
      ],
    });
    return res.json({
      paginateData: allUsers,
      count: count.length,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

// ------------------------------------  box expenses

const createExpense = async (req, res) => {
  const { boxId, name, price } = req.body;
  try {
    const boxExpense = await BoxExpenses.create({
      boxId,
      name,
      price,
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
  const { boxId } = req.query;

  try {
    const allUsers = await BoxExpenses.findAll({
      where: {
        boxId,
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
