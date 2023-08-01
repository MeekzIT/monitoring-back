const {
  getBenefit,
  getExpenses,
  getBenefitByDays,
} = require("../services/graphics");
const { getModeName, getInfoItemValues } = require("../services/item");

const Info = require("../models").Info;
const Items = require("../models").Item;
const ItemValues = require("../models").ItemValues;

const edit = async (req, res) => {
  try {
    const { data } = req.body;
    const item = await Info.findOne({
      where: { ownerID: data.ownerID, functionId: data.functionId },
    });
    await item.update(data);
    const allItem = await Info.findAll({ where: { ownerID: id } });

    return res.json({ succes: true, info: allItem });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getInfo = async (req, res) => {
  try {
    const { id } = req.query;
    const item = await Info.findAll({ where: { ownerID: id } });
    return res.json({ succes: true, info: item });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const clacData = async (req, res) => {
  try {
    const { ownerID } = req.query;
    const info = await Info.findAll({ where: { ownerID } });
    const item = await Items.findOne({ where: { p2: ownerID } });
    const modeUsedTime1 = Number(item.p44);
    const modeUsedTime2 = Number(item.p45);
    const modeUsedTime3 = Number(item.p46);
    const modeUsedTime4 = Number(item.p47);
    const modeUsedTime5 = Number(item.p48);
    const modeUsedTime6 = Number(item.p49);
    const allTimesers = [
      modeUsedTime1,
      modeUsedTime2,
      modeUsedTime3,
      modeUsedTime4,
      modeUsedTime5,
      modeUsedTime6,
    ];
    const data = [];
    await info.map((i, idx) => {
      const itemValues = getInfoItemValues(
        i.enginePower,
        i.electricPrice,
        i.waterPrice,
        i.waterPerMinute,
        i.modeValuePerLitre,
        i.PrcentOfRegulator,
        i.PrcetOfModeValueFirst,
        i.PrcetOfModeValueSecond,
        allTimesers[idx]
      );
      data.push({
        ...itemValues,
        functionId: i.functionId,
        modeName: getModeName(i.functionId),
        seconds: allTimesers[idx],
      });
    });
    return res.json({ succes: true, data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const expensesBenefitPrcent = async (req, res) => {
  try {
    const { ownerID } = req.query;
    let benefits = getBenefit(ownerID);
    let expenses = getExpenses(ownerID);
    let prcent = (expenses / benefits) * 100;
    return res.json({
      succes: true,
      data: {
        benefit: 100 - prcent,
        expenses: prcent,
      },
    });
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

const getBenefitsByDate = async (req, res) => {
  try {
    const { ownerID } = req.query;
    let data = getBenefitByDays(ownerID);
    return res.json({
      succes: true,
      data,
    });
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};
module.exports = {
  edit,
  getInfo,
  clacData,
  expensesBenefitPrcent,
  getBenefitsByDate,
};
