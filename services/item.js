const Item = require("../models").Item;
const Item2 = require("../models").Item2;
const Item3 = require("../models").Item3;
const Info = require("../models").Info;
const Info2 = require("../models").Info2;
const ItemValues = require("../models").ItemValues;
const Item2Values = require("../models").Item2Values;
const Item3Values = require("../models").Item3Values;

const axios = require("axios");

const checkInfo = async (ownerID, devicesTytpe) => {
  try {
    if (devicesTytpe == 1) {
      const info = await Info.findAll({ where: { ownerID } });
      return Boolean(info);
    } else if (devicesTytpe == 2) {
      const info = await Info2.findAll({ where: { ownerID } });
      return Boolean(info);
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async () => {
  try {
    axios
      .get(`${process.env.SERVER_URL}/devices`)
      .then(async function (response) {
        // handle success
        await Item.destroy({
          where: {},
          truncate: true,
        });
        await Item2.destroy({
          where: {},
          truncate: true,
        });
        await Item3.destroy({
          where: {},
          truncate: true,
        });
        await response.data.map(async (item) => {
          if (item.p0 == 1) {
            // const haveInfo = checkInfo(item.p2, item.p0);
            // !haveInfo && (await Info.create({ ownerID: item.p2 }));
            await Item.create({ ...item, access: true });
            await ItemValues.create(item);
          } else if (item.p0 == 2) {
            const haveInfo = await checkInfo(item.p2, 2);
            console.log(
              haveInfo,
              "----------------------------------------------------------"
            );
            haveInfo &&
              (await Info2.create({
                ownerID: item.p2,
                first: 0,
                second: 0,
                value1: 15,
                value2: 15,
                time1: 40,
                time2: 40,
              }));
            await Item2.create(item);
            await Item2Values.create({ ...item, access: true });
          } else if (item.p0 == 3) {
            await Item3.create(item);
            await Item3Values.create({ ...item, access: true });
          }
          console.log("--------------------- ready --------------------------");
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (ownerId, active) => {
  try {
    axios
      .get(`${process.env.SERVER_URL}/devices/?ID=${ownerId}`)
      .then(async (response) => {
        if (active == 1) {
          const item = await Item.findOne({
            where: { p2: String(ownerId) },
          });

          await item.update({ ...response.data[0], access: item.access });
        } else if (active == 2) {
          const item = await Item2.findOne({
            where: { p2: String(ownerId) },
          });

          await item.update({ ...response.data[0], access: item.access });
        } else if (active == 3) {
          const item = await Item3.findOne({
            where: { p2: String(ownerId) },
          });

          await item.update({ ...response.data[0], access: item.access });
        }
        console.log("--------------------- updated --------------------------");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getOwnerItems = async (id) => {
  try {
    axios
      .get(`${process.env.SERVER_URL}/devices/`, {
        params: {
          id: id.slice(0, id.length - 3),
        },
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editData = async (data) => {
  try {
    axios
      .post(
        `${process.env.SERVER_URL}/devie/edit`,
        {
          OwnerID: Number(data.id),
          ParamNO: Number(data.fileld),
          NewData: data.fieldValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getModeName = (mode) => {
  switch (mode) {
    case "0":
      return "wax";
    case "1":
      return "water";
    case "2":
      return "talinwater";
    case "3":
      return "smoking";
    case "4":
      return "tapwater";
    case "5":
      return "milk";
    case "6":
      return "hoover";
    case "7":
      return "foam";
    case "8":
      return "enginefluid";
    case "9":
      return "blackening";
    case "10":
      return "air";
    case "11":
      return "drycleaning";
    case "12":
      return "osmosis";
    case "13":
      return "hotwater";
    case "14":
      return "payer";
    case "15":
      return "distilledwater";
    case "16":
      return "lowpressurewater";
    case "17":
      return "doublefoam";
    case "18":
      return "hotair";
    case "19":
      return "wheelpump";
  }
};

const getInfoItemValues = (
  enginePower,
  electricPrice,
  waterPrice,
  waterPerMinute,
  modeValuePerLitre,
  PrcentOfRegulator,
  PrcetOfModeValueFirst,
  PrcetOfModeValueSecond,
  time
) => {
  try {
    const prcent =
      Number(PrcetOfModeValueFirst) + Number(PrcetOfModeValueSecond);
    const prcetByModeByPrce = Number(modeValuePerLitre) / prcent / 1000 || 0;
    const caxsPerMinuteByElectricy =
      (Number(enginePower) * Number(electricPrice)) / 60 || 0;
    const caxsPerMinuteByWater =
      (Number(waterPrice) / 1000) * Number(waterPerMinute) || 0;
    const caxsPerMinuteByModeValue = prcetByModeByPrce * PrcentOfRegulator * 5;
    // prcent = 4
    //  prcetByModeByPrce = 1500 / 4

    const caxsPerDayByElectricy = time * caxsPerMinuteByElectricy;
    const caxsPerDayByWater = time * caxsPerMinuteByWater;
    const caxsByModeValue = time * caxsPerMinuteByModeValue;

    return {
      electric: caxsPerDayByElectricy,
      water: caxsPerDayByWater,
      modeValue: caxsByModeValue,
      total: caxsPerDayByElectricy + caxsPerDayByWater + caxsByModeValue,
    };
  } catch (error) {
    console.log(error);
  }
};

const getInfoItemValuesGraph = async (item, ownerID) => {
  try {
    const info = await Info.findAll({ where: { ownerID } });
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
    await info.map(async (i, idx) => {
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
      data.push(itemValues);
    });
    let total = {
      electric: 0,
      water: 0,
      modeValue: 0,
      date: item.createdAt,
    };
    await data.map((i) => {
      total = {
        ...total,
        electric: total.electric + i.electric,
        water: total.water + i.water,
        modeValue: total.modeValue + i.modeValue,
      };
    });
    return {
      ...total,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getOwnerItems,
  editData,
  getModeName,
  getInfoItemValues,
  getInfoItemValuesGraph,
  getSingle,
};
