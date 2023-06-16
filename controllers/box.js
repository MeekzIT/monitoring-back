const Boxes = require("../models").Box;
const Item = require("../models").Item;
const ItemValues = require("../models").ItemValues;

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
  console.log(ownerId, "---------------------------------------------------");
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
          // include: [
          //   {
          //     model: ItemValues,
          //   },
          // ],
        },
      ],
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  edit,
  getAllBoxesOfOwners,
};
