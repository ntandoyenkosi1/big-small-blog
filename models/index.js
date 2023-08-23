const Comment=require("./comment.model")
const User=require("./user.model")
const Post=require("./post.model")

User.hasMany(Comment)
Comment.belongsTo(User,{foreignKey:"user_id"})

User.hasMany(Post)
Post.belongsTo(User, {foreignKey:"user_id"})
module.exports={
    Comment,User,Post
}