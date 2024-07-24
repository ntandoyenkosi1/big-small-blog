const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config");
const User = require("./user.model");

class Chat extends Model {}

Chat.init(
  {
    content: DataTypes.STRING,
    User1: {
      type: DataTypes.INTEGER,
    },
    User2: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

module.exports = Chat;
