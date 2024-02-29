var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order");

const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/registrate", authMiddleWare, orderController.registrate);
router.post("/", authMiddleWare, orderController.create);

module.exports = router;
