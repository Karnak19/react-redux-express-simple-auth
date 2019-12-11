require("dotenv").config(); // To get environment variables from a .env file
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const passport = require("passport");
const PORT = process.env.PORT || 8000;

// Get the Sequelize config
const sequelize = require("./sequelize");
// require("./sequelize/associations"); // If you have associations

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger("tiny"));

app.use(passport.initialize());
require("./passport");

// Routes
app.get("/", (req, res) => res.send("Hello world !"));
app.use("/login", require("./routes/login.route"));
app.use("/register", require("./routes/register.route"));
app.use("/sports", require("./routes/sports.route"));

async function main() {
  try {
    await sequelize.sync(); // Sync Method will create Database using the config & models
    console.log("Database connection sucessfull");
    app.listen(PORT, err => {
      if (err) throw new Error("Something bad happened...");
      console.log(`Listening to port ${PORT}.`);
    });
  } catch (err) {
    console.error("Unable to reach database", err);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

// For testing with chai-http
module.exports = app;
