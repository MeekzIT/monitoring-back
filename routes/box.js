var express = require("express");
var router = express.Router();
const boxController = require("../controllers/box");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authMiddleWare, boxController.create);
router.post("/create", authMiddleWare, boxController.createExpense);
router.post("/edit-box", authMiddleWare, boxController.edit);
router.post("/edit", authMiddleWare, boxController.editExpense);
router.post("/edit", authMiddleWare, boxController.editExpense);
router.post("/del", authMiddleWare, boxController.destroy);
router.post("/destroy", authMiddleWare, boxController.destroyBox);

router.get("/", boxController.getAllBoxExpenses);

module.exports = router;
