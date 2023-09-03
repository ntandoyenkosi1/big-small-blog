const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class User extends Model { }

User.init(
    {
        name: { type: DataTypes.STRING },
        email: {
            type: DataTypes.STRING, validate: {
                is: ['.+@.+', 'i']
            }
        },
        image: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        sequelize,
        freezeTableName:true,underscored:true
    }
);

module.exports = User;