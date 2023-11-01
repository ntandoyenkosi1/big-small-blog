const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
const { User } = require("./user.model")
class Post extends Model { }

Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    }
  },
  {
    sequelize, freezeTableName: true, underscored: true
  }
);

module.exports = Post;