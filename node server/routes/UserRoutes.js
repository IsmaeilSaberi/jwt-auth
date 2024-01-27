const express = require("express");
const router = express();

const UserCtrl = require("../controllers/UserControllers");

router.get("/users", UserCtrl.getAllUsers);
router.get("/get-one-user/:id", UserCtrl.getOneUser);
router.post("/new-user", UserCtrl.createUser);

router.post("/send-register-email", UserCtrl.sendRegisterEmail);
router.post("/send-register-phone", UserCtrl.sendRegisterPhone);

module.exports = router;
