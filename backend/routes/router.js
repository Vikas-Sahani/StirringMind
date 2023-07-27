const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("hello from the router file");
});

module.exports = router;
