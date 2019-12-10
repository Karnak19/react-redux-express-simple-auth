const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../index");

const User = sequelize.define(
  "User",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      // Automated hash using this hooks
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  }
);

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Boolean
};

module.exports = User;
