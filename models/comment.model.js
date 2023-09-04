const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Post = require('./post.model');

class Comment extends Model { }

Comment.init(
    {
        content: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        PostId:{
            type:DataTypes.INTEGER,
            references:{
                model: Post,
                key:"id"
            }
        }
    },
    {
        sequelize, freezeTableName: true, underscored: true
    }
);

module.exports = Comment;