const { Post, Comment } = require("../models")

const router = require("express").Router()

router.get("/", async (req, res) => {
    let posts = await Post.findAll({ include: { model: Comment } })
    posts = posts.map(x => x.get({ plain: true }))
    res.render("homepage", { posts })
})
router.get("/posts/create", (req,res)=>{
    res.render("create")
})
router.get("/posts/:id", async (req, res) => {
    let post = await Post.findByPk(req.params.id,{ include: { model: Comment } })
    post = post.get({ plain: true })
    console.log(post)
    res.render("post", { post })
})
router.get("/posts/edit/:id", async(req,res)=>{
    let post = await Post.findByPk(req.params.id)
    post = post.get({ plain: true })
    res.render("edit", {post})
})
router.get("/posts/delete/:id", (req,res)=>{
    res.render("delete")
})

router.get("/dashboard", async (req, res) => {
    if(!req.session.user) return res.redirect("/login")
    let posts = await Post.findAll({where:{UserId:req.session.user.id}},{ include: { model: Comment } })
    posts = posts.map(x => x.get({ plain: true }))
    res.render("dashboard", { posts })
})
router.get("/login", async (req, res) => {
    res.render("login")
})
router.get("/register", async (req, res) => {
    res.render("signup")
})
router.get("/logout", async (req, res) => {
    req.session.destroy(()=>{
        res.redirect("/")
    })
})
module.exports = router