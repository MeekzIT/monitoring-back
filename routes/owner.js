var express = require("express");
var router = express.Router();
const ownerController = require("../controllers/owner");
const boxController = require("../controllers/box");
const itemController = require("../controllers/item");
const infoControllers = require("../controllers/info");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", authMiddleWare, ownerController.create);
router.post("/pay", authMiddleWare, ownerController.changePaymentStatus);

router.get("/", authMiddleWare, ownerController.getAll);
router.get("/single", authMiddleWare, ownerController.getSingle);
router.get("/my-owners", authMiddleWare, ownerController.getAllOwnersOfUser);

///box

router.get("/boxes-owners", authMiddleWare, boxController.getAllBoxesOfOwners);
router.post("/edit-item", authMiddleWare, itemController.edit);

// info

router.post("/item-info-edit", authMiddleWare, infoControllers.edit);
router.post("/item-accessability", authMiddleWare, itemController.changeAccessability);
router.get("/item-info", authMiddleWare, infoControllers.getInfo);
router.get("/item-info-calc", authMiddleWare, infoControllers.clacData);
router.get(
  "/item-info-getBenefitsByDate",
  authMiddleWare,
  infoControllers.getBenefitsByDate
);
router.get(
  "/item-info-getBenefitsByModes",
  authMiddleWare,
  infoControllers.getBenefitsByModes
);
router.get(
  "/item-info-expensesBenefitPrcent",
  authMiddleWare,
  infoControllers.expensesBenefitPrcent
);
module.exports = router;
