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


router.get("/create", authAdminMiddleWare, adminController.create);
router.get("/activiyty", authAdminMiddleWare, adminController.adminActivity);
router.get("/destroy", authAdminMiddleWare, adminController.destroyAdmin);

module.exports = router;
