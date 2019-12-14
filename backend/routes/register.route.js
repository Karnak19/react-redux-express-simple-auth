const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const User = require("../sequelize/models/users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email
      },
      defaults: {
        password
      }
    });
    // console.log({ user }, { created });

    if (!created) {
      res.status(409).json({
        message: "User already exists !"
      });
    }
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h"
    });
    res.status(201).json({ ...user, token });
  } catch (err) {
    console.log({ err });

    res.status(409).json(err);
  }
});

module.exports = router;
