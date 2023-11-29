var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/login", adminController.login);
router.post("/logout", authAdminMiddleWare, adminController.logout);
router.post(
  "/changeSettings",
  authAdminMiddleWare,
  adminController.changeSettings
);
router.post(
  "/changePassword",
  authAdminMiddleWare,
  adminController.changePassword
);
router.get("/me", authAdminMiddleWare, adminController.getMe);

router.post("/create", authAdminMiddleWare, adminController.create);
router.post("/activity", authAdminMiddleWare, adminController.adminActivity);
router.post("/destroy", authAdminMiddleWare, adminController.destroyAdmin);
router.post("/reset", authAdminMiddleWare, adminController.resetPassword);
router.get("/", authAdminMiddleWare, adminController.getAdmins);

module.exports = router;
