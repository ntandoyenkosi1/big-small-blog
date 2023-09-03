const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Comment extends Model { }

Comment.init(
    {
        content: DataTypes.STRING,
        likes: DataTypes.INTEGER
    },
    {
        sequelize, freezeTableName: true, underscored: true
    }
);

module.exports = Comment;