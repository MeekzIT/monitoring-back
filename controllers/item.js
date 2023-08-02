const { editData } = require("../services/item");

const Items = require("../models").Item;

const edit = async (req, res) => {
  try {
    const { data } = req.body;
    const allFields = Object.keys(data).filter((key) => key !== "id");
    const keys = Object.keys(data);

    const item = await Items.findOne({ where: { id: data.id } });
    await item.update(data);
    allFields.map((i) =>
      editData({
        id: item.p2,
        fileld: i.slice(1, i.length),
        fieldValue: data[i],
      })
    );
    return res.json({ succes: true, data: item });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = { edit };
