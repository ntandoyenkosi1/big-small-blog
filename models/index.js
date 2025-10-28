const _Comment = require("./comment");
const _User = require("./user");
const _Post = require("./post");
const _Chat = require("./chat");

const Comment = _Comment.default || _Comment;
const User = _User.default || _User;
const Post = _Post.default || _Post;
const Chat = _Chat.default || _Chat;

module.exports = { Comment, User, Post, Chat };
