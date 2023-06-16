const ItemValues = require("../models").ItemValues;
const Info = require("../models").Info;

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}
const getBenefit = async (ownerID) => {
  try {
    const date = new Date();
    const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    const items = await ItemValues.findAll({
      where: {
        p2: ownerID,
        from: {
          $between: [firstDay, new Date()],
        },
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
        from: {
          $between: [firstDay, new Date()],
        },
      },
    });
    const info = await Info.findAll({ where: { ownerID } });
    let expenses = 0;
    await items.map(async (i) => {
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
        expenses = itemValues.total;
      });

      return expenses;
    });
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
        from: {
          $between: [firstDay, new Date()],
        },
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
        value: benifis + itemCoins + itemBill + itemCashLess,
      });
    });
    return data;
  } catch (e) {
    console.log(e, "Somethig went wrong");
  }
};

module.exports = {
  getBenefit,
  getExpenses,
  getBenefitByDays,
};
