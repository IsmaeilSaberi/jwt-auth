const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    min: [8, "نام کاربری باید حداقل 8 کاراکتر باشد ..."],
    max: [30, "نام کاربری باید حداکثر 30 کاراکتر باشد ..."],
    unique: [true, "لطفا نام کاربری دیگری انتخاب کنید ..."],
  },
  dispalyname: {
    type: String,
    min: [8, "نام نمایشی باید حداقل 8 کاراکتر باشد ..."],
    max: [30, "نام نمایشی باید حداکثر 30 کاراکتر باشد ..."],
  },
  email: {
    type: String,
    required: [true, "ایمیل وارد نشده است ..."],
    unique: [true, "لطفا ایمیل دیگری انتخاب کنید ..."],
  },
  password: {
    type: String,
    min: [8, "رمز عبور باید حداقل 8 کاراکتر باشد ..."],
    max: [24, "رمز عبور باید حداکثر 30 کاراکتر باشد ..."],
  },
  role: {
    type: Number,
    enum: [1, 3, 5],
  },
  joinedAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  email_log_num: {
    type: Number,
    enum: [1, 3, 5],
  },
  email_confirmed: {
    type: Boolean,
    default: false,
  },
  phone_log_num: {
    type: Number,
    enum: [1, 3, 5],
  },
  phone_confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
