const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//saving the used data in db
router.post("/register", async (req, res) => {
  console.log("from reg: checking what is in body", req.body);
  const { email, name, password, education, city, mobile } = req.body;

  if (!email || !name || !password || !education || !city || !mobile) {
    res.status(422).json("plz fill the data");
  }

  try {
    const preuser = await User.findOne({ email: email });
    console.log("reg: ", preuser);

    if (preuser) {
      res.status(422).json("this is user is already present");
    } else {
      const adduser = new User({
        email,
        name,
        password,
        education,
        city,
        mobile,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log("reg: ", adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  try {
    let token;
    const { email, password } = req.body;
    console.log("req.body from Login", req.body);
    if (!email || !password) {
      //if email or password are wrong then fill the form again
      return res
        .status(400)
        .json({ error: "plz fill the correct infromation" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log("from auth.js -> ", token);

      //storing the token(named -> jwtoken) in side browser
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Cridentials due to P" });
      } else {
        res.status(201).json({ message: "user login successfuly" });
      }
    } else {
      res.status(400).json({ error: "Invalid Cridentials due to E" });
    }

    // const user = new User({ name, email, phone, work, password, cpassword });
    // await user.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
