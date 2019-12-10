// This file will drop the database & recreate it.
// It's needed when you changes something in your models

const sequelize = require("./index");
// require("./associations");

// This is the {force: true} who drop & recreate the DB
(async () => {
  await sequelize.sync({ force: true });
  console.log("Successfully resync Database !");
  process.exit(0);
})();
