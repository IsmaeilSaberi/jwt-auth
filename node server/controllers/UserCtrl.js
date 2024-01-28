const User = require("../models/User");

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
