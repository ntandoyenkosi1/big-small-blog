const { User } = require("../models")
const router = require("express").Router()
const bcrypt = require("bcrypt")
// sign up
router.post("/signup", (req, res) => {
    const { name, email, password, image } = req.body
    const salt = bcrypt.genSaltSync(saltRounds);
    password = bcrypt.hashSync(password, salt)
    User.create({ name, email, password, email, image })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
// log in
router.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }).then((data) => {
        bcrypt.compareSync(password, data.password) ? res.json(data) : res.status(400).json("Incorrect password")
    }).catch((err) => {
        res.status(401).json(err)
    })

})
// change password
router.put("/:id", (req, res) => {
    const { password } = req.body
    User.create({ name, email, password, email })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
// get a user
router.get("/:id", (req, res) => {
    const { name, email, password, image } = req.body
    User.create({ name, email, password, email })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
module.exports=router