const { editData } = require("../services/item");
const { Op } = require("sequelize");
const Items = require("../models").Item;
const Item2 = require("../models").Item2;
const Item3 = require("../models").Item3;
const ItemValues = require("../models").ItemValues;
const ItemValues2 = require("../models").ItemValues2;
const ItemValues3 = require("../models").ItemValues3;

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
      console.log(
        single,
        "aaaaaaaaaaaaaaaaaaaaaaaa 1111111111111111111111111111111111111111111111111111111111111111111111111111"
      );
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

module.exports = {
  edit,
  changeAccessability,
  getItemDays,
  getItemMoney,
  getCurrentDateMoney,
  getSingle,
};
