const ItemValues = require("../models").ItemValues;
const Info = require("../models").Info;

const { Op } = require("sequelize");
const { getInfoItemValues, getInfoItemValuesGraph } = require("./item");

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}

function combineObjectsWithSimilarDates(data) {
  const combinedData = {};

  data.forEach((item) => {
    const { date, value } = item;
    const shortDate = String(date).substring(0, 10);

    if (combinedData[shortDate]) {
      combinedData[shortDate].value += value;
    } else {
      combinedData[shortDate] = {
        id: date,
        date: shortDate,
        value: value,
      };
    }
  });

  // Convert the combinedData object into an array of objects
  const combinedArray = Object.values(combinedData);

  return combinedArray[0];
}
function transformData(inputData) {
  const transformedData = {};

  inputData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "date") {
        if (!transformedData[key]) {
          transformedData[key] = [];
        }
        transformedData[key].push({ date: item.date, value: item[key] });
      }
    });
  });

  return transformedData;
}

const getBenefit = async (ownerID) => {
  try {
    const date = new Date();
    const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    const aaa = await ItemValues.findAll({
      where: {
        p2: ownerID,
      },
    });
    const items = await ItemValues.findAll({
      where: {
        p2: ownerID,
        // from: {
        //   $between: [firstDay, new Date()],
        // },
        // createdAt: {
        // [Op.lt]: firstDay,
        // [Op.gt]: new Date(),
        // [Op.between]: [firstDay],
        // },
      },
    });
    let benifis = 0;
    await items.map((i) => {
      let itemCoins = Number(i.p16) * Number(i.p10);
      let itemBill = Number(i.p17) * Number(i.p11);
      let itemCashLess = Number(i.p18) * Number(i.p12);

      benifis = benifis + itemCoins + itemBill + itemCashLess;
    });

    return benifis;
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

const getExpenses = async (ownerID) => {
  try {
    const date = new Date();
    const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    const items = await ItemValues.findAll({
      where: {
        p2: ownerID,
        // from: {
        //   $between: [firstDay, new Date()],
        // },
        // createdAt: {
        //   [Op.lt]: firstDay,
        //   [Op.gt]: new Date(),
        // },
      },
    });
    const info = await Info.findAll({ where: { ownerID } });
    let expenses = 0;
    items.map((i) => {
      const modeUsedTime1 = Number(i.p44);
      const modeUsedTime2 = Number(i.p45);
      const modeUsedTime3 = Number(i.p46);
      const modeUsedTime4 = Number(i.p47);
      const modeUsedTime5 = Number(i.p48);
      const modeUsedTime6 = Number(i.p49);
      const allTimesers = [
        modeUsedTime1,
        modeUsedTime2,
        modeUsedTime3,
        modeUsedTime4,
        modeUsedTime5,
        modeUsedTime6,
      ];
      info.map(async (i, idx) => {
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
        expenses = expenses + itemValues.total;
      });
    });
    return expenses;
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

const getExpensesByModes = async (item, ownerID) => {
  try {
    const date = new Date();
    const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());

    let data = [];
    const itemValues = await getInfoItemValuesGraph(item, ownerID);
    data.push(itemValues);

    const transformedData = await transformData(data);
    return transformedData;
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

const getBenefitByDays = async (ownerID) => {
  try {
    const date = new Date();
    const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());

    const items = await ItemValues.findAll({
      where: {
        p2: ownerID,
        // from: {
        //   $between: [firstDay, new Date()],
        // },
        // createdAt: {
        //   [Op.lt]: firstDay,
        //   [Op.gt]: new Date(),
        // },
      },
    });

    let data = [];

    await items.map((i) => {
      let itemCoins = Number(i.p16) * Number(i.p10);
      let itemBill = Number(i.p17) * Number(i.p11);
      let itemCashLess = Number(i.p18) * Number(i.p12);
      data.push({
        id: i.createdAt,
        date: i.createdAt,
        value: itemCoins + itemBill + itemCashLess,
      });
    });
    return combineObjectsWithSimilarDates(data);
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

module.exports = {
  transformData,
  getBenefit,
  getExpenses,
  getBenefitByDays,
  getExpensesByModes,
};
