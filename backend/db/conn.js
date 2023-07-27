const mongoose = require("mongoose");

const db = process.env.DATABASE;
mongoose
  .connect(db)
  .then(() => console.log("connection is succesfull"))
  .catch(() => {
    console.log("connection is not succesfull");
  });
