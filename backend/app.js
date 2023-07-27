require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const user = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const port = 8080;

const allowedOrigins = ["http://localhost:3000/", `http://localhost:${port}/`];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`server is start port number ${port}`);
});
