const router = require("express").Router()
const commentController = require("./comment.controller")
const postController = require("./post.controller")
const userController = require("./user.controller")

router.use("/users", userController)
router.use("/posts", postController)
router.use("/comments", commentController)

module.exports = router