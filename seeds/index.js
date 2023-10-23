const userData=require("./users")
const postData=require("./posts")
const commentData=require("./comments")
const {User,Post,Comment}=require("../models")

  User.bulkCreate(userData)
    .then(() => Post.bulkCreate(postData))
    .then(() => Comment.bulkCreate(commentData))
    .then(() => {
      console.log('Seed data inserted successfully.');
    })
    .catch((err) => {
      console.error('Error inserting seed data:', err);
    });
  