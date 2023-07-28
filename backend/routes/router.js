const express = require("express");
const User = require("../models/userSchema");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from the router file");
});

router.post("/register", async (req, res) => {
  console.log("getting the data inside server -> ", req.body); //getting the data from frontend
  const { email, name, password, education, city, mobile } = req.body;

  //checking isEmpty?
  if (!email || !name || !password || !education || !city || !mobile) {
    console.log("input feilds are empty");
    return res.status(404).json({ message: "input feilds are empty" });
  }

  //if not impty then send the data into db
  try {
    const isUserExist = await User.findOne({ email });
    //if Yes(user Exist then tell him to register with another details/values)
    if (isUserExist) {
      return res.status(422).json({
        message: "user is already exite pelease fill with another emails   ",
      });
    }

    //if user is not already register then send the user details into db
    const user = new User({
      email,
      name,
      password,
      education,
      city,
      mobile,
    });
    const userRegister = await user.save(); //saving the user data into db
    if (userRegister) {
      res
        .status(201)
        .json({ details: req.body, msg: "user Registered successfully in db" }); // sending the data
    } else {
      res.status(500).json({ errMsg: "Fialed to send the user details in DB" });
    }
  } catch (error) {
    console.log("catch -> ", error);
  }
});

module.exports = router;
