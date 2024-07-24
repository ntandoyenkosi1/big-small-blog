const userData = require("./users");
const postData = require("./posts");
const commentData = require("./comments");
const chatData = require("./chats");
const { User, Post, Comment, Chat } = require("../models");
const sequelize = require("../config");

// forces sequelize to sync models with db before seeding data
sequelize.sync({ force: true }).then(() => {
  User.bulkCreate(userData)
    .then(() => Post.bulkCreate(postData))
    .then(() => Comment.bulkCreate(commentData))
    .then(() => Chat.bulkCreate(chatData))
    .then(() => {
      console.log("Seed data inserted successfully.");
    })
    .catch((err) => {
      console.error("Error inserting seed data:", err);
    });
});
