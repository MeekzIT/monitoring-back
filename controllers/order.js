const Owner = require("../models").Owner;
const OwnerSystem = require("../models").OwnerSystem;
const Subscribtions = require("../models").Subscribtion;
const Contry = require("../models").Country;

const axios = require("axios");
const { getCuurentDate } = require("../services/item");

const registrate = async (req, res) => {
  try {
    const { ownerId } = req.body;
    const owner = await Owner.findOne({
      where: { id: ownerId },
    });
    const ownerSystem = await OwnerSystem.findOne({ where: { ownerId } });
    const country = await Contry.findOne({ where: { id: owner.countryId } });
    const subscribe = await Subscribtions.create({
      ownerId,
      language: country.short.toLowerCase(),
      status: "pending",
      amount: owner.variant,
    });

    axios
      .post(ownerSystem.api, null, {
        params: {
          userName: ownerSystem.login,
          password: ownerSystem.password,
          amount: owner.variant,
          currency: "051",
          language: country.short.toLowerCase(),
          orderNumber: subscribe.id,
          returnUrl: "https://monitoring.jsxmachines.com/result",
        },
      })
      .then(async function (response) {
        console.log(response.data, "[[[[[[[[[]]]]]]]]]]");

        if (response.data.errorCode == 0) {
          subscribe.mdOrder = response.data.orderId;
          await subscribe.save();
          return res.json({ succes: true, data: response.data.formUrl });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getStatus = async (req, res) => {
  try {
    const { orderId } = req.body;
    const subscribe = await Subscribtions.findOne({
      where: { mdOrder: orderId },
    });
    console.log(subscribe, "---");

    const ownerSystem = await OwnerSystem.findOne({
      where: { ownerId: subscribe.ownerId },
    });
    const owner = await Owner.findOne({
      where: { id: subscribe.ownerId },
    });
    axios
      .post(
        "https://ipay.arca.am/payment/rest/getOrderStatusExtended.do",
        null,
        {
          params: {
            userName: ownerSystem.login,
            password: ownerSystem.password,
            orderId,
          },
        }
      )
      .then(async function (response) {
        if (response.data.errorCode == 0) {
          subscribe.status = "success";
          await subscribe.save();
          owner.subscribe = true;
          owner.lastPay = getCuurentDate();
          await owner.save();
          console.log();
          return res.json({ succes: true, data: subscribe });
        } else {
          subscribe.status = "fail";
          await subscribe.save();
          return res.json({ succes: false });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  registrate,
  getStatus,
};
