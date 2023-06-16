var express = require("express");
var router = express.Router();
const superStatisticsController = require("../controllers/superStatistics");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/user-country", superStatisticsController.countryUsers);

module.exports = router;
