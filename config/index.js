// const Sequelize = require("sequelize");
const mongoose =require("mongoose")
require("dotenv").config();
/**
 * //@deprecated
 * 
 * Uncomment the code below in order to use SQLite.
 * @SQLite comes in handy in deployment environments aimed at utilizing less resources
 * @install SQLite using `npm install sqlite3`
 */
//const sequelize = new Sequelize({ dialect: "sqlite", storage: "blog.db" });
// const sequelize = new Sequelize(
//   process.env.DB_NAMES,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     port: 3306,
//   }
// );
const connection=mongoose.createConnection(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/blog")
module.exports= connection
