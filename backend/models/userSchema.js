const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs"); //it's does not return a promise
const jwt = require("jsonwebtoken");

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
    type: String, //to convert it into hash, it's type should be in String
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
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  console.log("preMethod -> ", this);

  if (this.isModified("password")) {
    this.password = bcryptjs.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateToken = async function () {
  try {
    const newGenToken = jwt.sign({ _id: this._id }, process.env.SECRET); //generating new token
    this.tokens = this.tokens.concat({ token: newGenToken }); //adding the generated token into userSchema
    await this.save(); //saving the generated token into db
    return newGenToken; //return newGenToken -> to store the token into cookies
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("newdb", userSchema);

module.exports = User;
