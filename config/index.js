const Sequelize = require('sequelize');

require('dotenv').config();
/**
 * Uncomment the code below in order to use SQLite.
 * SQLite comes in handy in deployment environments aimed at utilizing less resources
 * @install SQLite using `npm install sqlite3`
 */
//const sequelize= new Sequelize({dialect:"sqlite", storage:"blog.db"})
const sequelize = new Sequelize( process.env.DB_NAMES, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
