const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().sort({ _id: -1 });
    res.status(200).json({ msg: "ok!", data: allUsers });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "an error in getting all users!" });
  }
};
module.exports.getAllUsers = getAllUsers;

const getOneUser = async (req, res) => {
  try {
    const theUser = await User.findById(req.params.id);
    res.status(200).json({ msg: "ok!", data: theUser });
  } catch (error) {
    console.log(err);
    res.status(400).json({ msg: "an error in getting one user by id!" });
  }
};
module.exports.getOneUser = getOneUser;

const createUser = async (req, res) => {
  try {
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/.test(req.body.username)
    ) {
      return res.status(401).json({ msg: "username structure is wrong!" });
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/.test(
        req.body.displayname
      )
    ) {
      return res.status(401).json({ msg: "displayname structure is wrong!" });
    }
    if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email)
    ) {
      return res.status(401).json({ msg: "email structure is wrong!" });
    }
    if (!/^[0][0-9]{10}$/.test(req.body.phone)) {
      return res.status(401).json({ msg: "phone structure is wrong!" });
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(
        req.body.password
      )
    ) {
      return res.status(401).json({ msg: "password structure is wrong!" });
    }
    if (formData.password != formData.repassword) {
      return res
        .status(401)
        .json({ msg: "repassword is not match with password!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 15);

    const emailRandNumber = Math.floor(
      Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9)
    );
    const phoneRandNumber = Math.floor(
      Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9)
    );

    const userData = {
      username: req.body.username,
      displayname: req.body.displayname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      role: 3,
      joinedAt: req.body.joinedAt,
      email_log_num: emailRandNumber,
      email_confirmed: false,
      phone_log_num: phoneRandNumber,
      phone_confirmed: false,
    };

    const newUser = await User.create(userData);

    const token = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
      },
      process.env.TOKEN_SECRET
    );

    res.status(200).json({
      msg: "ok",
      loged: 1,
      email_confirmed: -1,
      phone_confirmed: -1,
      role: 3,
      auth_token: token,
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({ msg: "an error in creating user!" });
  }
};
module.exports.createUser = createUser;

const sendRegisterEmail = async (req, res) => {
  try {
  } catch (error) {
    console.log(err);
    res.status(400).json({ msg: "an error in sending register email!" });
  }
};
module.exports.sendRegisterEmail = sendRegisterEmail;

const sendRegisterPhone = async (req, res) => {
  try {
  } catch (error) {
    console.log(err);
    res.status(400).json({ msg: "an error in sending register phone!" });
  }
};
module.exports.sendRegisterPhone = sendRegisterPhone;
