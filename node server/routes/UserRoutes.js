const express = require("express");
const router = express();

const UserCtrl = require("../controllers/UserCtrl");
const UserExist = require("../middlewares/userExist");
const userExist = require("../middlewares/userExist");

router.get("/users", UserCtrl.getAllUsers);
router.get("/get-one-user", UserExist, UserCtrl.getOneUser);
router.post("/new-user", UserCtrl.createUser);
router.post("/login-user", UserCtrl.loginUser);

router.post("/send-register-email", UserCtrl.sendRegisterEmail);
router.post("/send-register-phone", UserCtrl.sendRegisterPhone);

router.get("/cookie-to-user", UserExist, UserCtrl.cookieToUser);
router.post("/add-to-cart", UserExist, UserCtrl.addToCart);
module.exports = router;
