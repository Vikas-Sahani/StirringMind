const express = require("express");
const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, name, password, education, city, mobile } = req.body;

  //now check if any feild is empty or not, if empty then throw an error
  if (!email || !name || !password || !education || !city || !mobile) {
    console.log("input feilds are not filled properly");
    return res
      .status(404)
      .json({ error: "input feilds are not filled properly" });
  }

  //if sending the data after checking
  try {
    const isExist = await User.findOne({ email });

    //if yes(means ->regitered data already exist then throw error)
    if (isExist) {
      console.log("user is already registered with these datas");
      return res
        .status(404)
        .json({ error: "user is already registered with these datas" });
    } else {
      //if filled data is new & unique then register the user & send it to db
      const newUserReged = new User({
        email,
        name,
        password,
        education,
        city,
        mobile,
      }); //it return's the same stored object

      const regSuccess = await newUserReged.save(); //it return's the saved Object

      if (regSuccess) {
        //if registration is successfull then show msg
        console.log("details are stored in db");
        res
          .status(201)
          .json({ details: regSuccess, msg: "details are stored in db" });
      } else {
        console.log("details are not stored in db");
        res.status(404).json({ error: "details are not stored in db" });
      }
    }
  } catch (err) {
    console.log("catch err-> ", err);
  }
  // res.status(201).json({ msg: "register is created" });  //multilpel res are not allowed to the same http req in the node.js
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ err: "pls write your details" });
    } else {
      //isUserExist on basis of email
      const isExist = await User.findOne({ email });

      if (!isExist) {
        console.log("invalide email");
        return res.json({ err: "pls fill the valid credentials" });
      } else {
        // if user exist then check his pswd
        const isPswd = await bcryptjs.compare(
          password.toString(),
          isExist.password
        );
        if (!isPswd) {
          console.log("invalid pswd");
          return res.json({ err: "pls fill the valid credentials" });
          // {"email":"vk9782606@gmail.com", "password":"1234"}
        } else {
          console.log("user Login Success");
          return res.json("user Login Success");
          // {"email":"vk9782606@gmail.com", "password":"abcd"}
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
