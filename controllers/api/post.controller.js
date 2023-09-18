const { Post, Comment } = require("../../models")
const router = require("express").Router()

// create post
router.post("/", (req, res) => {
    Post.create({...req.body, likes:0}).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(401).json(err)
    })
})
router.put("/:id", (req, res) => {
    Post.update(req.body, {where:{id:req.params.id}}).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(401).json(err)
    })
})
router.put("/:id/like", async(req, res) => {
    let existingPost = await Post.findOne({ where: { id: req.params.id } })
    Post.update({ likes: existingPost.likes + 1 }, { where: { id: req.params.id } })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(401).json(err)
        })
})
router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id, {include:[{model:Comment}]})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
router.get("/", (req, res) => {
    Post.findAll({include:[{model:Comment}]})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
router.delete("/:id", (req, res) => {
    Post.destroy({where:{id:req.params.id}})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
module.exports = router