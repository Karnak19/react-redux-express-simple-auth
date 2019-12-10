const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const User = require("../sequelize/models/users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create({
      email,
      password
    });
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h"
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
