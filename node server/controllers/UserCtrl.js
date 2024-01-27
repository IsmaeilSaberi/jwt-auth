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
