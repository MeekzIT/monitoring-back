const Item = require("../models").Item;
const Info = require("../models").Info;
const ItemValues = require("../models").ItemValues;

const axios = require("axios");

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
        await response.data.map(async (item) => {
          await Item.create(item);
          await ItemValues.create(item);
          const itemInfo = await Info.findOne({ where: { ownerId: item.p2 } });
          if (!itemInfo) {
            await Info.create({ ownerId: item.p2 });
          }
          console.log(
            "ready",
            "----------------------------------------------------"
          );
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

const getOwnerItems = async (id) => {
  try {
    axios
      .get(`${process.env.SERVER_URL}/Owner/`, {
        params: {
          id: id.slice(0, id.length - 3),
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
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
          OwnerID: String(data.id),
          ParamNO: data.fileld,
          NewData: data.fieldValue,
        },
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
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
    const prcetByModeByPrce = (Number(modeValuePerLitre) / prcent) * 1000;
    const caxsPerMinuteByElectricy =
      (Number(enginePower) * Number(electricPrice)) / 60;
    const caxsPerMinuteByWater =
      (Number(waterPrice) / 1000) * Number(waterPerMinute);
    const caxsPerMinuteByModeValue =
      (Number(modeValuePerLitre) / 1000) *
      Number(PrcentOfRegulator) *
      0.2 *
      Number(prcetByModeByPrce);

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

module.exports = {
  getAll,
  getOwnerItems,
  editData,
  getModeName,
  getInfoItemValues,
};
