const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
});

const user = new mongoose.model("users", userSchema);

module.exports = user;
