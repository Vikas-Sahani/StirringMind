const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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
    type: Number, //to convert it into hash, it's type should be in String
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
  mobile: {
    type: Number,
    require: true,
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  console.log("preMethod -> ", this);

  if (this.isModified("password")) {
    this.password = bcryptjs.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("newdb", userSchema);

module.exports = User;
