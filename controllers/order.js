const Owner = require("../models").Owner;
const OwnerSystem = require("../models").OwnerSystem;
const Subscribtions = require("../models").Subscribtion;
const Contry = require("../models").Country;

const axios = require("axios");

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
    console.log({
      userName: ownerSystem.login,
      password: ownerSystem.password,
      amount: owner.variant,
      currency: "051",
      language: country.short.toLowerCase(),
      orderNumber: subscribe.id,
      returnUrl: "https://monitoring.jsxmachines.com/result",
    });
    axios
      .post(ownerSystem.api, {
        userName: ownerSystem.login,
        password: ownerSystem.password,
        amount: owner.variant,
        currency: "051",
        language: country.short.toLowerCase(),
        orderNumber: subscribe.id,
        returnUrl: "https://monitoring.jsxmachines.com/result",
      })
      .then(async function (response) {
        console.log(response.data, "---");
        // if ((response.data.errorCode = 0)) {
        // subscribe.mdOrder = response.data.mdOrder;
        subscribe.mdOrder = "xxx-uuuuuu-askdhjvaisdv-asidhvaiscdv";
        await subscribe.save();
        return res.json({ succes: true, data: subscribe });
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const create = async (req, res) => {
  try {
    const { mdOrder, number, name, expiry, cvc } = req.body;

    const subscribe = await Subscribtions.findOne({
      where: { mdOrder },
    });
    const ownerSystem = await OwnerSystem.findOne({
      where: { ownerId: subscribe.ownerId },
    });

    subscribe.cart = number;
    subscribe.year = expiry.slice(0, 4);
    subscribe.month = expiry.slice(4, 6);
    subscribe.cvv = cvc;
    subscribe.name = name;
    await subscribe.save();

    axios
      .post(ownerSystem.api, {
        userName: ownerSystem.login,
        password: ownerSystem.password,
        $PAN: number,
        $CVC: cvc,
        YYYY: expiry.slice(0, 4),
        MM: expiry.slice(4, 6),
        TEXT: name,
        language: subscribe.language,
      })
      .then(async function (response) {
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
  create,
};
