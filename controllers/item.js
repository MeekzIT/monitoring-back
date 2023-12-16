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
const Boxes = require("../models").Box;
const BoxExpenses = require("../models").BoxExpenses;

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
              [Op.like]: getPreviousDayDate(i.datatime) + "%",
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
              [Op.like]: getPreviousDayDate(i.datatime) + "%",
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
            [Op.like]: getPreviousDayDate(item.datatime) + "%",
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
            [Op.like]: getPreviousDayDate(item.datatime, active) + "%",
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
            [Op.like]: getPreviousDayDate(item.datatime, active) + "%",
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
function getDatesInRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  // If endDate is not provided, set it to the current date
  const finalDate = endDate ? new Date(endDate) : new Date();

  while (currentDate <= finalDate) {
    dateArray.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

const getBoxInfoService = async (ownerId, date, endDate, moikaId) => {
  try {
    let queryObj = {};
    const days = getDatesInRange(date, endDate);
    const items1 = [];
    const items2 = [];
    if (moikaId) {
      queryObj["p5"] = {
        [Op.eq]: moikaId,
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

    await Promise.all(
      days.map(async (entery) => {
        const point = await ItemValues.findOne({
          where: {
            ...queryObj,
            p2: {
              [Op.like]: String(ownerId) + "%",
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });

        point && items1.push(point.dataValues);
        const itemCurrent = await Items.findOne({
          where: {
            p2: {
              [Op.like]: String(ownerId),
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        itemCurrent && items1.push(itemCurrent.dataValues);
      })
    );
    await Promise.all(
      days.map(async (entery) => {
        const point = await ItemValues2.findOne({
          where: {
            ...queryObj,
            p2: {
              [Op.like]: String(ownerId) + "%",
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        point && items2.push(point.dataValues);
        const item2Current = await Item2.findOne({
          where: {
            p2: {
              [Op.like]: String(ownerId),
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        item2Current && items2.push(item2Current.dataValues);
      })
    );

    const box = await Boxes.findOne({ where: { ownerId } });

    const allResult = [];
    console.log(items1, "items1items1items1items1items1items1items1");
    await Promise.all(
      !date
        ? await item.map(async (i) => {
            const prevDay = await ItemValues.findOne({
              where: {
                ...queryObj,
                p2: i.p2,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
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
                coin,
                cash,
                bill,
                type: 1,
                caxs: caxs.caxs,
                ratio:
                  caxs.caxs !== 0
                    ? (Math.abs(caxs.caxs) / Math.abs(result1)) * 100
                    : 100,
                data: [...caxs.data],
                // box,
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
                coin,
                cash,
                bill,
                caxs: caxs.caxs,
                ratio:
                  caxs.caxs !== 0
                    ? (Math.abs(caxs.caxs) / Math.abs(result1)) * 100
                    : 100,
                type: 1,
                data: [...caxs.data],
                // box,
              });
            }
          })
        : items1.map(async (i) => {
            const prevDay = await ItemValues.findOne({
              where: {
                ...queryObj,
                p2: i.p2,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
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
                coin,
                cash,
                bill,
                type: 1,
                caxs: caxs.caxs,
                ratio: caxs.caxs !== 0 ? (caxs.caxs / result1) * 100 : 100,
                data: [...caxs.data],
                // box,
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
                coin,
                cash,
                bill,
                caxs: caxs.caxs,
                ratio:
                  caxs.caxs !== 0
                    ? (Math.abs(caxs.caxs) / Math.abs(result1)) * 100
                    : 100,
                type: 1,
                data: [...caxs.data],
                // box,
              });
            }
          })
    );
    await Promise.all(
      !date
        ? await item2.map(async (i) => {
            const prevDay2 = await ItemValues2.findOne({
              where: {
                ...queryObj,
                p2: i.p2,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
                },
              },
            });
            if (prevDay2) {
              let result2 =
                (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
              const caxs = await clacData2(i.p2);
              // const box = await Boxes.findOne({ where: { id: i.p5, ownerId } });
              allResult.push({
                id: i.p2,
                result: result2,
                coin,
                cash,
                bill,
                caxs: caxs.total,
                ratio: caxs !== 0 ? (caxs / result2) * 100 : 100,
                // box,
                type: 2,
              });
            } else {
              let result2 = Number(i.p18) * Number(i.p12);
              const caxs = await clacData2(i.p2);
              // const box = await Boxes.findOne({ where: { id: i.p5, ownerId } });
              allResult.push({
                id: i.p2,
                ratio: caxs !== 0 ? (caxs / result2) * 100 : 100,
                result: result2,
                caxs: caxs.total,
                firstValue1: caxs.firstValue1,
                secondValue1: caxs.secondValue1,
                type: 2,
                // box,
              });
            }
          })
        : items2.map(async (i) => {
            const prevDay2 = await ItemValues2.findOne({
              where: {
                ...queryObj,
                p2: i.p2,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
                },
              },
            });
            if (prevDay2) {
              let result2 =
                (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
              const caxs = await clacData2(i.p2);
              // const box = await Boxes.findOne({ where: { id: i.p5, ownerId } });
              allResult.push({
                id: i.p2,
                result: result2,
                caxs: caxs.total,
                ratio: caxs !== 0 ? (caxs / result2) * 100 : 100,
                // box,
                type: 2,
              });
            } else {
              let result2 = Number(i.p18) * Number(i.p12);
              const caxs = await clacData2(i.p2);
              // const box = await Boxes.findOne({ where: { id: i.p5, ownerId } });
              allResult.push({
                id: i.p2,
                ratio: caxs !== 0 ? (caxs / result2) * 100 : 100,
                result: result2,
                coin,
                cash,
                bill,
                caxs: caxs.total,
                firstValue1: caxs.firstValue1,
                secondValue1: caxs.secondValue1,
                type: 2,
                // box,
              });
            }
          })
    );

    let result = 0;
    let expense = 0;

    let coin = 0;
    let cash = 0;
    let bill = 0;
    await allResult.map((i) => {
      result = result + i.result;
      expense = expense + i.caxs;

      coin = coin + i.coin;
      cash = cash + i.cash;
      bill = bill + i.bill;
    });
    let percentage = 0;
    if (expense === 0) {
      percentage = 100;
    }
    if (result == 0) {
      percentage = 100;
    } else {
      // Calculate the ratio
      const ratio = expense / result;

      // Convert the ratio to a percentage
      percentage = ratio * 100 || 0;
    }
    return {
      succes: true,
      data: {
        result,
        expense,
        benefit: result - expense,
        ratio: Math.round(percentage),
        coin,
        cash,
        bill,
        allResult,
        box,
      },
    };
  } catch (e) {
    console.log("something went wrong", e);
  }
};
const getOwnerInfo = async (req, res) => {
  try {
    const { ownerId, date, endDate } = req.query;
    const expenses = await BoxExpenses.findAll({
      where: {
        ownerId,
      },
    });
    let expenseValueMonth = 0;
    await Promise.all(
      await expenses.map(async (i) => {
        expenseValueMonth = expenseValueMonth + Number(i.dataValues.price);
      })
    );
    const dayExspanse = Math.round(expenseValueMonth / 30);
    const result = await getBoxInfoService(ownerId, date, endDate, false);

    return res.json({
      ...result,
      data: {
        ...result.data,
        expense: result.data.expense + dayExspanse,
        ratio: ((result.data.expense + dayExspanse) / result.data.result) * 100,
      },
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getBoxesInfo = async (req, res) => {
  try {
    const { ownerId, date, endDate, boxId } = req.query;
    let queryObj = {};
    let queryObj1 = {};
    if (boxId) {
      queryObj["boxId"] = {
        [Op.eq]: boxId,
      };
      queryObj1["id"] = {
        [Op.eq]: boxId,
      };
    }
    const box = await Boxes.findAll({ where: { ownerId } });
    const result = [];
    const expenses = await BoxExpenses.findAll({
      where: {
        ...queryObj,
        ownerId,
      },
    });
    await Promise.all(
      await box.map(async (i) => {
        const data = await getBoxInfoService(ownerId, date, endDate, i.id);
        result.push(data.data);
      })
    );
    let expenseValueMonth = 0;
    await Promise.all(
      await expenses.map(async (i) => {
        expenseValueMonth = expenseValueMonth + Number(i.dataValues.price);
      })
    );
    const dayExspanse = Math.round(expenseValueMonth / 30);

    return res.json(
      boxId
        ? [
            {
              ...result[0],
              expense: result[0].expense + dayExspanse,
              ratio:
                ((result[0].expense + dayExspanse) / result[0].result) * 100,
            },
          ]
        : result
    );
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getItemInfo = async (req, res) => {
  try {
    const { ownerId, date, endDate } = req.query;

    const data = await getBoxInfoService(ownerId, date, endDate);
    return res.json(data);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

function getDaysInCurrentMonth() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const lastDayOfMonth = new Date(year, month, 0);

  // Generate an array of dates for each day in the month
  const daysArray = [];
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const formattedDay = `${year.toString()}-${
      (month < 10 ? "0" : "") + month.toString()
    }-${(day < 10 ? "0" : "") + day.toString()}`;
    daysArray.push(formattedDay);
  }

  return daysArray;
}

function findDifferencesBetweenArrays(array1, array2) {
  // Remove duplicates from each array
  const uniqueArray1 = Array.from(new Set(array1));
  const uniqueArray2 = Array.from(new Set(array2));

  // Find differences between the arrays
  const differences = [];

  uniqueArray1.forEach((item) => {
    if (!uniqueArray2.includes(item)) {
      differences.push(item);
    }
  });

  uniqueArray2.forEach((item) => {
    if (!uniqueArray1.includes(item)) {
      differences.push(item);
    }
  });

  return differences;
}

function fillAbsentDays(data, startDate, endDate, ownerId) {
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();
  const filledArray = [];

  for (
    let timestamp = startTimestamp;
    timestamp <= endTimestamp;
    timestamp += 24 * 60 * 60 * 1000
  ) {
    const currentDate = new Date(timestamp).toISOString().split("T")[0];

    const existingData = data.find((item) => item.date === currentDate);

    if (existingData) {
      filledArray.push(existingData);
    } else {
      filledArray.push({
        id: ownerId,
        result: 0,
        caxs: 0,
        all: 0,
        date: currentDate,
      });
    }
  }

  return filledArray;
}

function addOrUpdateEntry(data, ownerId) {
  const days = getDaysInCurrentMonth();

  const newDays = data.map((i) => i.date);

  const dfindDifferencesBetweenArrays = findDifferencesBetweenArrays(
    newDays,
    days
  ); 
  [...new Set(dfindDifferencesBetweenArrays)].map((i) => {
    data.push({
      id: ownerId,
      result: 0,
      caxs: 0,
      all: 0,
      date: i,
    });
  });
  
  return data.sort((a, b) => a.date.localeCompare(b.date, undefined, { numeric: true }));
}

const getItemDaysService = async (ownerId, date, endDate) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const days = getDatesInRange(date, endDate);
    let queryObj = {};
    if (!date) {
      queryObj["datatime"] = {
        [Op.like]: year + "-" + month + "%",
      };
    }
    const items1 = [];
    const items2 = [];

    const item = await ItemValues.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: String(ownerId),
        },
      },
    });
    const itemCurrent = await Items.findAll({
      where: {
        p2: {
          [Op.like]: String(ownerId),
        },
      },
    });
    const item2 = await ItemValues2.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: String(ownerId),
        },
      },
    });
    const item2Current = await Item2.findAll({
      where: {
        p2: {
          [Op.like]: String(ownerId),
        },
      },
    });
    await Promise.all(
      days.map(async (entery) => {
        const point = await ItemValues.findOne({
          where: {
            ...queryObj,
            p2: {
              [Op.like]: String(ownerId) + "%",
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        point && items1.push(point.dataValues);
        const itemCurrent = await Items.findOne({
          where: {
            p2: {
              [Op.like]: String(ownerId),
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        itemCurrent && items1.push(itemCurrent.dataValues);
      })
    );
    await Promise.all(
      days.map(async (entery) => {
        const point = await ItemValues2.findOne({
          where: {
            ...queryObj,
            p2: {
              [Op.like]: String(ownerId) + "%",
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        point && items2.push(point.dataValues);
        const item2Current = await Item2.findOne({
          where: {
            p2: {
              [Op.like]: String(ownerId),
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        item2Current && items2.push(item2Current.dataValues);
      })
    );

    let allResult = [];
    await Promise.all(
      !date
        ? await item.concat(itemCurrent).map(async (i) => {
            const prevDay = await ItemValues.findOne({
              where: {
                p2: ownerId,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
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
                caxs: caxs.caxs,
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
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
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
              });
            }
          })
        : await items1.map(async (i) => {
            const prevDay = await ItemValues.findOne({
              where: {
                p2: ownerId,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
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
                caxs: caxs.caxs,
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
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
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
              });
            }
          })
    );
    await Promise.all(
      !date
        ? await item2.concat(item2Current).map(async (i) => {
            const prevDay2 = await ItemValues2.findOne({
              where: {
                p2: i.p2,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
                },
              },
            });
            if (prevDay2) {
              let result2 =
                (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
              const caxs = await clacData2(i.p2);
              // const box = await Boxes.findOne({ where: { id: i.p5, ownerId } });
              allResult.push({
                id: i.p2,
                result: result2,
                caxs: caxs.caxs,
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
              });
            } else {
              let result2 = Number(i.p18) * Number(i.p12);
              const caxs = await clacData2(i.p2);
              allResult.push({
                id: i.p2,
                result: result2,
                caxs: caxs.caxs,
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
              });
            }
          })
        : items2.map(async (i) => {
            const prevDay2 = await ItemValues2.findOne({
              where: {
                p2: i.p2,
                datatime: {
                  [Op.like]: getPreviousDayDate(i.datatime) + "%",
                },
              },
            });
            if (prevDay2) {
              let result2 =
                (Number(i.p18) - Number(prevDay.p18)) * Number(prevDay.p12);
              const caxs = await clacData2(i.p2);
              // const box = await Boxes.findOne({ where: { id: i.p5, ownerId } });
              allResult.push({
                id: i.p2,
                result: result2,
                caxs: caxs.caxs,
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
              });
            } else {
              let result2 = Number(i.p18) * Number(i.p12);
              const caxs = await clacData2(i.p2);
              allResult.push({
                id: i.p2,
                result: result2,
                caxs: caxs.caxs,
                all: result1 + caxs.caxs,
                date: i.datatime.slice(0, 10),
              });
            }
          })
    );
    return !date
      ? addOrUpdateEntry(allResult, ownerId)
      : fillAbsentDays(allResult, date, endDate, ownerId);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getItemDaysLinear = async (req, res) => {
  try {
    const { ownerId, date, endDate } = req.query;
    const data = await getItemDaysService(ownerId, date, endDate);
    return res.json({ succes: true, data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

function mergeData(inputData) {
  const mergedData = {};

  // Iterate through each nested array
  inputData.forEach((nestedArray) => {
    // Iterate through each object in the nested array
    nestedArray.forEach((obj) => {
      const key = obj.id + obj.date;

      // If the key doesn't exist in mergedData, add the object
      if (!mergedData[key]) {
        mergedData[key] = obj;
      } else {
        // If the key exists, update the fields
        mergedData[key].result += obj.result;
        mergedData[key].caxs += obj.caxs;
        mergedData[key].all += obj.all;
        // You can add more fields if needed
      }
    });
  });

  // Convert the values of the mergedData object into an array
  const resultArray = Object.values(mergedData);

  return resultArray;
}

const getBoxesInfoLinear = async (req, res) => {
  try {
    const { ownerId, date, endDate, boxId } = req.query;
    const currentDate = new Date();
    const items1 = [];
    const items2 = [];
    const days = getDatesInRange(date, endDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    let queryObj = {};
    if (boxId) {
      queryObj["p5"] = {
        [Op.eq]: boxId,
      };
    }
    if (!date || !endDate) {
      queryObj["datatime"] = {
        [Op.like]: year + "-" + month + "%",
      };
    }

    const item = await ItemValues.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: String(ownerId) + "%",
        },
      },
    });
    const item2 = await ItemValues2.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: String(ownerId) + "%",
        },
      },
    });
    const itemCurrent = await Items.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: String(ownerId),
        },
      },
    });
    const itemCurrent2 = await Item2.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: String(ownerId),
        },
      },
    });

    await Promise.all(
      days.map(async (entery) => {
        const point = await ItemValues.findOne({
          where: {
            ...queryObj,
            p2: {
              [Op.like]: String(ownerId) + "%",
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });

        point && items1.push(point.dataValues);
      })
    );
    await Promise.all(
      days.map(async (entery) => {
        const point = await ItemValues2.findOne({
          where: {
            ...queryObj,
            p2: {
              [Op.like]: String(ownerId) + "%",
            },
            datatime: {
              [Op.like]: entery + "%",
            },
          },
        });
        point && items2.push(point.dataValues);
      })
    );

    const result = [];
    let boxIdis = [];

    await Promise.all(
      endDate
        ? await items1.concat(items2).map(async (i) => {
            boxIdis.push(i.p2);
          })
        : await item
            .concat(itemCurrent)
            .concat(item2)
            .concat(itemCurrent2)
            .map(async (i) => {
              boxIdis.push(i.p2);
            })
    );
    await Promise.all(
      await [...new Set(boxIdis)].map(async (entery) => {
        const itemData = await getItemDaysService(entery, date, endDate);
        result.push(itemData);
      })
    );
    const mergedExpenses = {};
    mergeData(result).forEach((expense) => {
      const date = expense.date;

      if (!mergedExpenses[date]) {
        mergedExpenses[date] = { result: 0, caxs: 0, all: 0, date: date };
      }

      mergedExpenses[date].result += expense.result;
      mergedExpenses[date].caxs += expense.caxs;
      mergedExpenses[date].all += expense.all;
    });
    const resultArray = Object.values(mergedExpenses);
    return res.json({ succes: true, data: resultArray });
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
  getOwnerInfo,
  getBoxesInfo,
  getItemInfo,
  getItemDaysLinear,
  getBoxesInfoLinear,
};
