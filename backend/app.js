const express = require("express");
require("dotenv").config();
require("./db/conn");
const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello from the backend");
});

app.listen(5000, () => {
  console.log(`server is connected at ${port}`);
});
