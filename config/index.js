const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize( process.env.DB_NAME||"big_small", process.env.DB_USER || "root", process.env.DB_PASSWORD || "root", {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
