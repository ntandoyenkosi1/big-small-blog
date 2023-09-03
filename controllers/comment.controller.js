const { Comment } = require("../models")
const router = require("express").Router()

// create Comment
router.post("/", (req, res) => {
    Comment.create(req.body).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(401).json(err)
    })
})
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
router.get("/:id", (req, res) => {
    Comment.findAll()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

router.delete("/:id", (req, res) => {
    Comment.destroy(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
module.exports = router