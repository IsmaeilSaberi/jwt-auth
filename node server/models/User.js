const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: [1, 3, 5],
    required: true,
  },
  joinedAt: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  email_log_num: {
    type: Number,
    required: true,
  },
  email_confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
  phone_log_num: {
    type: Number,
    required: true,
  },
  phone_confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
