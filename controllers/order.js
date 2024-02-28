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

    axios
      .post(ownerSystem.api, {
        userName: ownerSystem.login,
        password: ownerSystem.password,
        amount: owner.variant,
        currency: 643,
        language: country.short.toLowerCase(),
        orderNumber: subscribe.id,
        returnUrl: "https://monitoring.jsxmachines.com/payment",
      })
      .then(async function (response) {
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


module.exports = {
  registrate,
};
