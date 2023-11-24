const {
  editData,
  getInfoItemValues,
  getModeName,
} = require("../services/item");
const { Op } = require("sequelize");
const Items = require("../models").Item;
const Item2 = require("../models").Item2;
const Item3 = require("../models").Item3;
const ItemValues = require("../models").ItemValues;
const ItemValues2 = require("../models").Item2Values;
const ItemValues3 = require("../models").Item3Values;
const Info = require("../models").Info;
const Info2 = require("../models").Info2;

const edit = async (req, res) => {
  try {
    const { data } = req.body;
    const allFields = Object.keys(data).filter((key) => key !== "id");
    const keys = Object.keys(data);
    const item = await Items.findOne({ where: { id: data.id } });
    const item2 = await Item2.findOne({ where: { id: data.id } });
    const item3 = await Item3.findOne({ where: { id: data.id } });

    if (item) {
      await item.update(data);
      allFields.map((i) =>
        editData({
          id: item.p2,
          fileld: i.slice(1, i.length),
          fieldValue: data[i],
        })
      );
      return res.json({ succes: true, data: item });
    } else if (item2) {
      await item2.update(data);
      allFields.map((i) =>
        editData({
          id: item.p2,
          fileld: i.slice(1, i.length),
          fieldValue: data[i],
        })
      );
      return res.json({ succes: true, data: item });
    } else if (item3) {
      await item3.update(data);
      allFields.map((i) =>
        editData({
          id: item3.p2,
          fileld: i.slice(1, i.length),
          fieldValue: data[i],
        })
      );
      return res.json({ succes: true, data: item });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.query;
    const item = await Items.findOne({ where: { p2: id } });
    const item2 = await Item2.findOne({ where: { p2: id } });
    const item3 = await Item3.findOne({ where: { p2: id } });

    if (item) {
      return res.json({ succes: true, data: item });
    } else if (item2) {
      return res.json({ succes: true, data: item2 });
    } else if (item3) {
      return res.json({ succes: true, data: item3 });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changeAccessability = async (req, res) => {
  try {
    const { id, access } = req.body;
    const { role } = req.user;
    if (role == "owner") {
      const item = await Items.findOne({ where: { p2: id } });
      item.access = access;
      await item.save();
      return res.json({ succes: true, data: item });
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getItemDays = async (req, res) => {
  try {
    const { ownerID } = req.query;
    const item = await ItemValues.findAll({ where: { p2: ownerID } });
    const data = await item.map((i) => i.datatime);
    return res.json({ succes: true, data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

async function getItemsWithinDateRange(startDate, endDate, ownerID) {
  try {
    const whereClause = {};

    if (startDate) {
      whereClause.datatime = {
        [Op.gte]: startDate,
      };
    }

    if (endDate) {
      if (whereClause.datatime) {
        whereClause.datatime[Op.lte] = endDate;
      } else {
        whereClause.datatime = {
          [Op.lte]: endDate,
        };
      }
    }
    const items = await ItemValues.findAll({
      where: { ...whereClause, p2: ownerID },
    });
    return items;
  } catch (error) {
    throw error;
  }
}

function getPreviousDayDate(inputDate) {
  try {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);

    // Check if the inputDate is a valid date
    if (isNaN(date.getTime())) {
      return "Invalid input. Please provide a valid date in the format 'YYYY-MM-DD'.";
    }

    // Subtract one day from the date
    date.setDate(date.getDate() - 1);

    // Get the year, month, and day components of the previous day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Assemble the previous day date string in 'YYYY-MM-DD' format
    const previousDayDate = `${year}-${month}-${day}`;

    return previousDayDate;
  } catch (error) {
    return "An error occurred. Please try again with a valid date in the format 'YYYY-MM-DD'.";
  }
}

const getItemMoney = async (req, res) => {
  try {
    const { ownerID, start, end, active } = req.query;
    if (active === 1) {
      const items = await getItemsWithinDateRange(start, end, ownerID);
      const result = {
        MonetizationOnIcon: 0,
        LocalAtmIcon: 0,
        CreditScoreIcon: 0,
      };
      await items.map(async (i) => {
        const prevDay = await ItemValues.findOne({
          where: {
            p2: i.p2,
            datatime: {
              [Op.like]: getPreviousDayDate(i.datatime),
            },
          },
        });
        if (prevDay) {
          let coin = (Number(i.p16) - Number(prevDay.p16)) * Number(i.p10);
          let cash = (Number(i.p17) - Number(prevDay.p17)) * Number(i.p11);
          let bill = (Number(i.p18) - Number(prevDay.p18)) * Number(i.p12);
          result.MonetizationOnIcon = result.MonetizationOnIcon + coin;
          result.LocalAtmIcon = result.LocalAtmIcon + cash;
          result.CreditScoreIcon = result.CreditScoreIcon + bill;
        } else {
          let coin = Number(i.p16) * Number(i.p10);
          let cash = Number(i.p17) * Number(i.p11);
          let bill = Number(i.p18) * Number(i.p12);
          result.MonetizationOnIcon = result.MonetizationOnIcon + coin;
          result.LocalAtmIcon = result.LocalAtmIcon + cash;
          result.CreditScoreIcon = result.CreditScoreIcon + bill;
        }
      });

      return res.json({ succes: true, data: result });
    } else if (active === 3) {
      const items = await getItemsWithinDateRange(start, end, ownerID);
      const result = {
        MonetizationOnIcon: 0,
      };
      await items.map(async (i) => {
        const prevDay = await ItemValues3.findOne({
          where: {
            p2: i.p2,
            datatime: {
              [Op.like]: getPreviousDayDate(i.datatime),
            },
          },
        });
        if (prevDay) {
          let bill = (Number(i.p18) - Number(prevDay.p18)) * Number(i.p12);
          result.CreditScoreIcon = result.CreditScoreIcon + bill;
        } else {
          let bill = Number(i.p18) * Number(i.p12);
          result.CreditScoreIcon = result.CreditScoreIcon + bill;
        }
      });

      return res.json({ succes: true, data: result });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getCurrentDateMoney = async (req, res) => {
  try {
    const { single, active } = req.query;

    if (active == 1) {
      const item = await Items.findOne({ where: { p2: single } });
      const prevDay = await ItemValues.findOne({
        where: {
          p2: single,
          datatime: {
            [Op.like]: getPreviousDayDate(item.datatime),
          },
        },
      });

      const result = {
        MonetizationOnIcon: 0,
        LocalAtmIcon: 0,
        CreditScoreIcon: 0,
      };

      if (prevDay) {
        let coin =
          (Number(item.p16) - Number(prevDay.p16)) * Number(prevDay.p10);
        let cash =
          (Number(item.p17) - Number(prevDay.p17)) * Number(prevDay.p11);
        let bill =
          (Number(item.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
        result.MonetizationOnIcon = result.MonetizationOnIcon + coin;
        result.LocalAtmIcon = result.LocalAtmIcon + cash;
        result.CreditScoreIcon = result.CreditScoreIcon + bill;
      } else {
        let coin = Number(item.p16) * Number(item.p10);
        let cash = Number(item.p17) * Number(item.p11);
        let bill = Number(item.p18) * Number(item.p12);
        result.MonetizationOnIcon = result.MonetizationOnIcon + coin;
        result.LocalAtmIcon = result.LocalAtmIcon + cash;
        result.CreditScoreIcon = result.CreditScoreIcon + bill;
      }

      return res.json({ succes: true, data: result });
    } else if (active == 3) {
      const item = await Item3.findOne({ where: { p2: single } });
      const prevDay = await ItemValues3.findOne({
        where: {
          p2: single,
          datatime: {
            [Op.like]: getPreviousDayDate(item.datatime, active),
          },
        },
      });

      const result = {
        CreditScoreIcon: 0,
      };

      if (prevDay) {
        let bill =
          (Number(item.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
        result.CreditScoreIcon = result.CreditScoreIcon + bill;
      } else {
        let bill = Number(item.p18) * Number(item.p12);
        result.CreditScoreIcon = result.CreditScoreIcon + bill;
      }

      return res.json({ succes: true, data: result });
    } else if (active == 2) {
      const item = await Item2.findOne({ where: { p2: single } });
      const prevDay = await ItemValues2.findOne({
        where: {
          p2: single,
          datatime: {
            [Op.like]: getPreviousDayDate(item.datatime, active),
          },
        },
      });

      const result = {
        MonetizationOnIcon: 0,
        LocalAtmIcon: 0,
        CreditScoreIcon: 0,
      };

      return res.json({ succes: true, data: result });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const clacData1 = async (ownerID) => {
  try {
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
    let caxs = 0;
    await data.map((i) => (caxs = caxs + Number(i.total)));
    return { data, caxs };
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const clacData2 = async (ownerID) => {
  try {
    const info = await Info2.findOne({ where: { ownerID } });
    const item = await Item2.findOne({ where: { p2: ownerID } });
    const firstValue =
      (Number(item.p22) * Number(info.value1)) / Number(info.time1);
    const secondValue =
      (Number(info.time2) * Number(info.value2)) / Number(info.time2);
    const firstPrice = Number(info.first) / 1000;
    const secondPrice = Math.round(Number(info.second) / 1000);
    const firstValue1 = Math.round(firstValue * item.p53 * firstPrice);
    const secondValue1 = secondValue * item.p54 * secondPrice;
    return {
      total: firstValue1 + secondValue1,
      firstValue1,
      secondValue1,
    };
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getBoxInfo = async (req, res) => {
  try {
    console.log(
      "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    );
    const { ownerId, date } = req.query;
    let queryObj = {};
    if (date) {
      queryObj["datatime"] = {
        [Op.like]: "%" + date + "%",
      };
    }

    const item = await Items.findAll({
      where: {
        p2: {
          [Op.like]: String(ownerId) + "%",
        },
      },
    });
    const item2 = await Item2.findAll({
      where: {
        p2: {
          [Op.like]: String(ownerId) + "%",
        },
      },
    });
    // const item3 = await Item3.findAll({
    //   where: {
    //     p2: {
    //       [Op.like]: String(ownerId) + "%",
    //     },
    //   },
    // });
    const allResult = [];

    await Promise.all(
      await item.map(async (i) => {
        const prevDay = await ItemValues.findOne({
          where: {
            p2: i.p2,
            datatime: {
              [Op.like]: getPreviousDayDate(i.datatime),
            },
          },
        });
        if (prevDay) {
          let coin =
            (Number(i.p16) - Number(prevDay.p16)) * Number(prevDay.p10);
          let cash =
            (Number(i.p17) - Number(prevDay.p17)) * Number(prevDay.p11);
          let bill =
            (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
          let result1 = coin + cash + bill;
          let caxs = await clacData1(i.p2);
          allResult.push({
            id: i.p2,
            result: result1,
            type: 1,
            caxs: caxs.caxs,
            ratio: caxs.caxs !== 0 ? (caxs.caxs / result1) * 100 : 100,
            data: [...caxs.data],
          });
        } else {
          let coin = Number(i.p16) * Number(i.p10);
          let cash = Number(i.p17) * Number(i.p11);
          let bill = Number(i.p18) * Number(i.p12);
          let caxs = await clacData1(i.p2);

          let result1 = coin + cash + bill;
          allResult.push({
            id: i.p2,
            result: result1,
            caxs: caxs.caxs,
            ratio: caxs.caxs !== 0 ? (caxs.caxs / result1) * 100 : 100,
            type: 1,
            data: [...caxs.data],
          });
        }
      })
    );
    // await Promise.all(
    //   await item3.map(async (i) => {
    //     const prevDay3 = await ItemValues3.findOne({
    //       where: {
    //         p2: i.p2,
    //         datatime: {
    //           [Op.like]: getPreviousDayDate(i.datatime),
    //         },
    //       },
    //     });
    //     if (prevDay3) {
    //       let result3 =
    //         (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
    //       allResult.push({
    //         id: i.p2,
    //         caxs: 0,
    //         result: result3,
    //         type: 3,
    //       });
    //     } else {
    //       let result3 = Number(i.p18) * Number(i.p12);
    //       allResult.push({
    //         id: i.p2,
    //         result: result3,
    //         caxs: 0,
    //         type: 3,
    //       });
    //     }
    //   })
    // );
    await Promise.all(
      await item2.map(async (i) => {
        const prevDay2 = await ItemValues2.findOne({
          where: {
            p2: i.p2,
            datatime: {
              [Op.like]: getPreviousDayDate(i.datatime),
            },
          },
        });
        if (prevDay2) {
          let result2 =
            (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
          const caxs = await clacData2(i.p2);
          allResult.push({
            id: i.p2,
            result: result2,
            caxs: caxs.total,
            ratio: caxs !== 0 ? (caxs / result2) * 100 : 100,

            type: 2,
          });
        } else {
          let result2 = Number(i.p18) * Number(i.p12);
          const caxs = await clacData2(i.p2);

          allResult.push({
            id: i.p2,
            ratio: caxs !== 0 ? (caxs / result2) * 100 : 100,
            result: result2,
            caxs: caxs.total,
            firstValue1: caxs.firstValue1,
            secondValue1: caxs.secondValue1,
            type: 2,
          });
        }
      })
    );

    let result = 0;
    let expense = 0;

    await allResult.map((i) => {
      result = result + i.result;
      expense = expense + i?.caxs;
    });
    let percentage = 0;
    if (expense === 0) {
      percentage = 100;
    } else {
      // Calculate the ratio
      const ratio = expense / result;

      // Convert the ratio to a percentage
      percentage = ratio * 100;
    }
    return res.json({
      succes: true,
      data: {
        result,
        expense,
        benefit: result - expense,
        ratio: percentage,
        allResult,
      },
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  edit,
  changeAccessability,
  getItemDays,
  getItemMoney,
  getCurrentDateMoney,
  getSingle,
  getBoxInfo,
};
