const express = require("express");
const app = express();
require("dotenv").config();
require("./db/conn");

app.use(express.json()); //our server doesn't understand json data so we need to allow it
app.use(require("./routes/router"));

app.get("/", (req, res) => {
  res.send("hello from the backend");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
