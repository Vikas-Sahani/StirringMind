const mongoose = require("mongoose");

const db = process.env.DATABASE;
mongoose
  .connect(db)
  .then(() => {
    console.log("connection is sucessfull");
  })
  .catch(() => {
    console.log("connection is fail");
  });
