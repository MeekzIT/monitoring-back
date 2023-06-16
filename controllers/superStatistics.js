const Contry = require("../models").Country;
const Users = require("../models").User;

const countryUsers = async (req, res) => {
  try {
    const users = await Contry.findAll({
      include: [
        {
          model: Users,
        },
      ],
    });
    return res.json(users);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  countryUsers,
};
