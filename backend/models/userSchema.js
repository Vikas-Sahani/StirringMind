const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: Number,
    require: true,
  },
  education: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: Number,
    require: true,
    unique: true,
  },
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
