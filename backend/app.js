const express = require("express");
require("dotenv").config();
require("./db/conn");
const router = require("./routes/router");

const app = express();
const port = process.env.PORT || 5000;

app.use(router);

app.get("/", (req, res) => {
  res.send("hello from the backend");
});

app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
