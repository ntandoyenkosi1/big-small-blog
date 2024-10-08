const Comment = require("./comment.model");
const User = require("./user.model");
const Post = require("./post.model");
const Chat = require("./chat.model");
Post.hasMany(Comment);
Comment.belongsTo(Post, { foreignKey: "PostId" });

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: "UserId" });

User.hasMany(Comment);
Comment.belongsTo(User, { foreignKey: "UserId" });

// User.hasMany(Chat);
// Chat.belongsToMany(User);
module.exports = {
  Comment,
  User,
  Post,
  Chat,
};
