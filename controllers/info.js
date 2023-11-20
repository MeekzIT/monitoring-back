const { map } = require("../app");
const {
  getBenefit,
  getExpenses,
  getBenefitByDays,
  getBenefitsByMode,
  getExpensesByModes,
  transformData,
} = require("../services/graphics");
const { getModeName, getInfoItemValues } = require("../services/item");

const Info = require("../models").Info;
const Info2 = require("../models").Info2;
const Items = require("../models").Item;
const Items2 = require("../models").Item2;
const ItemValues = require("../models").ItemValues;

const edit = async (req, res) => {
  try {
    const { data } = req.body;
    if (data.active == 1) {
      const item = await Info.findOne({
        where: { ownerID: data.ownerID, functionId: data.functionId },
      });
      await item.update(data);
      const allItem = await Info.findAll({ where: { ownerID: data.ownerID } });

      return res.json({ succes: true, info: allItem });
    } else if (data.active == 2) {
      const item = await Info2.findOne({
        where: { ownerID: data.ownerID },
      });
      await item.update(data);
      return res.json({ succes: true, info: item });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getInfo = async (req, res) => {
  try {
    const { id, active } = req.query;
    if (active == 1) {
      const item = await Info.findAll({ where: { ownerID: id } });
      return res.json({ succes: true, info: item });
    } else if (active == 2) {
      const item = await Info2.findAll({ where: { ownerID: id } });
      return res.json({ succes: true, info: item });
    }
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
    console.log(allTimesers, "allTimesers");
    const getModeTimer = (mode) => {
      if (mode == 1) {
        return modeUsedTime1;
      } else if (mode == 2) {
        return modeUsedTime2;
      } else if (mode == 3) {
        return modeUsedTime3;
      } else if (mode == 4) {
        return modeUsedTime4;
      } else if (mode == 5) {
        return modeUsedTime5;
      } else if (mode == 6) {
        return modeUsedTime6;
      }
    };
    const data = [];
    await info.map(async (i, idx) => {
      const itemValues = await getInfoItemValues(
        i.enginePower,
        i.electricPrice,
        i.waterPrice,
        i.waterPerMinute,
        i.modeValuePerLitre,
        i.PrcentOfRegulator,
        i.PrcetOfModeValueFirst,
        i.PrcetOfModeValueSecond,
        getModeTimer(i.mode)
      );
      data.push({
        ...itemValues,
        functionId: i.functionId,
        modeName: getModeName(i.functionId),
        seconds: getModeTimer(i.mode),
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

    let benefits = await getBenefit(ownerID);
    let expenses = await getExpenses(ownerID);
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
    const owners = JSON.parse(ownerID);

    let data = [];
    owners.map(async (i) => {
      let newData = await getBenefitByDays(i);
      data.push(newData);
    });

    return res.json({
      succes: true,
      data,
    });
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

const getBenefitsByModes = async (req, res) => {
  try {
    const { ownerID } = req.query;
    const data = [];
    const items = await ItemValues.findAll({
      where: {
        p2: ownerID,
      },
    });
    await items.map(async (i) => {
      let newData = await getExpensesByModes(i, ownerID);
      data.push(newData);
    });
    await res.json({
      succes: true,
      data: transformData(data),
    });
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

const clacData2 = async (req, res) => {
  try {
    const { ownerID } = req.query;
    const info = await Info2.findOne({ where: { ownerID } });
    const item = await Items2.findOne({ where: { p2: ownerID } });
    const firstValue =
      (Number(item.p22) * Number(info.value1)) / Number(info.time1);
    const secondValue =
      (Number(info.time2) * Number(info.value2)) / Number(info.time2);
    const firstPrice = Number(info.first) / 1000;
    const secondPrice = Number(info.second) / 1000;
    return res.json({
      succes: true,
      data: {
        firstValue: firstValue * item.p53 * firstPrice,
        secondValue: secondValue * item.p54 * secondPrice,
      },
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  edit,
  getInfo,
  clacData,
  expensesBenefitPrcent,
  getBenefitsByDate,
  getBenefitsByModes,
  clacData2,
};
