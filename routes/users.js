var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", userController.create);
router.post("/pay", authMiddleWare, userController.changePaymentStatus);

router.get("/", userController.getAll);
router.get("/single", authMiddleWare, userController.getSingle);

module.exports = router;
