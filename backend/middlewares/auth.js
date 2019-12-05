require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports.auth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.status(401).json({ message: "No Token provided" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) res.status(401).json({ message: "Invalid Token" });
    req.email = decoded.email;
    next();
  });
};
