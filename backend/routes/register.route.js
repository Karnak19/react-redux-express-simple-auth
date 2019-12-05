const express = require("express");
const router = express.Router();

const User = require("../sequelize/models/users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create({
      email,
      password
    });
    res.status(201).json({});
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
