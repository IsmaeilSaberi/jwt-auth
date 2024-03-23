const express = require("express");
const router = express();

const UserCtrl = require("../controllers/UserCtrl");
const UserExist = require("../middlewares/userExist");

router.get("/users", UserCtrl.getAllUsers);
router.get("/get-one-user", UserExist, UserCtrl.getOneUser);
router.post("/new-user", UserCtrl.createUser);
router.post("/login-user", UserCtrl.loginUser);

router.get("/send-register-email", UserExist, UserCtrl.sendRegisterEmail);
router.get("/send-register-phone", UserExist, UserCtrl.sendRegisterPhone);

router.post("/confirm-user-email", UserExist, UserCtrl.confirmUserEmail);
router.post("/confirm-user-phone", UserExist, UserCtrl.sendRegisterPhone);

router.get("/cookie-to-user", UserExist, UserCtrl.cookieToUser);
router.post("/add-to-cart", UserExist, UserCtrl.addToCart);
module.exports = router;
