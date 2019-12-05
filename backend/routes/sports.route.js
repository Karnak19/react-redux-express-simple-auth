const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const sports = ["Ice Hockey", "Baseball", "BasketBall"];

router.get("/", auth, (req, res) => {
  res.status(200).json(sports);
});

module.exports = router;
