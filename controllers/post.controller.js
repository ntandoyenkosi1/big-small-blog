const { Post } = require("../models")
const router = require("express").Router()

// create post
router.post("/", (req, res) => {
    Post.create(req.body).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(401).json(err)
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
router.get("/:id", (req, res) => {
    Post.findAll()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
// change password
router.delete("/:id", (req, res) => {
    Post.destroy(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
module.exports = router