const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

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

module.exports = router;
