var express = require("express")
var router = express.Router()
const ownerController = require("../controllers/owner")
const boxController = require("../controllers/box")
const itemController = require("../controllers/item")
const infoControllers = require("../controllers/info")
const authMiddleWare = require("../middlewares/adminAuthMiddleware")

router.post("/create", authMiddleWare, ownerController.create)
router.post("/edit", ownerController.edit)
router.post("/pay", authMiddleWare, ownerController.changePaymentStatus)
router.post("/edit-system", authMiddleWare, ownerController.editSystem)
router.get("/system", authMiddleWare, ownerController.getSystem)
router.post("/generate", ownerController.generateUnicue)
router.get("/", authMiddleWare, ownerController.getAll)
router.get("/single", authMiddleWare, ownerController.getSingle)
router.get("/my-owners", authMiddleWare, ownerController.getAllOwnersOfUser)
router.post("/delete-owner", authMiddleWare, ownerController.delateAccount)

///box

router.get("/boxes-owners", boxController.getAllBoxesOfOwners)
router.post("/edit-item", authMiddleWare, itemController.edit)
router.get("/item-single", authMiddleWare, itemController.getSingle)
router.post("/item-edit-name", authMiddleWare, itemController.editName)
router.post("/item-destroy", itemController.destroyItem)

// info

router.post("/item-info-edit", authMiddleWare, infoControllers.edit)
router.post("/item-info", infoControllers.create)
router.post("/item-info-del", infoControllers.destroyInfo)
router.post(
    "/item-accessability",
    itemController.changeAccessability
)
router.get("/item-info", authMiddleWare, infoControllers.getInfo)
router.get("/item-info-calc", infoControllers.clacData)
router.get("/item-info-calc2", authMiddleWare, infoControllers.clacData2)
router.get(
    "/item-info-getBenefitsByDate",
    authMiddleWare,
    infoControllers.getBenefitsByDate
)
router.get(
    "/item-info-getBenefitsByModes",
    authMiddleWare,
    infoControllers.getBenefitsByModes
)
router.get(
    "/item-info-expensesBenefitPrcent",
    authMiddleWare,
    infoControllers.expensesBenefitPrcent
)
router.post("/info-destroy", infoControllers.destroy)
router.post("/info-create", infoControllers.createInfo)
router.get("/info-get", infoControllers.getValues)
router.get("/item-calc-dates", authMiddleWare, itemController.getItemDays)
router.get("/item-calc-money", authMiddleWare, itemController.getItemMoney)
router.get("/item-calc-current", itemController.getCurrentDateMoney)
router.get("/get-info", itemController.getOwnerInfo)
router.get("/get-boxes-info", itemController.getBoxesInfo)
router.get("/get-item-info", itemController.getItemInfo)
router.get("/get-item-days", itemController.getItemDaysLinear)
router.get("/get-box-days", itemController.getBoxesInfoLinear)


// loyals

// router.get("/item-loyal", itemController.getItemLoyal)
module.exports = router
