require("dotenv").config();
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const User = require("../sequelize/models/users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      res.status(404).json({
        message: "User not found"
      });
    }
    if (!user.validPassword(password)) {
      res.status(403).json({
        message: "Invalid password !"
      });
    }
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h"
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
