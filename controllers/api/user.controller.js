const { User } = require("../../models")
const router = require("express").Router()
const bcrypt = require("bcrypt")
// sign up
router.post("/signup", (req, res) => {
    let { name, email, password, image } = req.body
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    User.create({ name, password, email, image })
        .then((data) => {
            let user=data.get({plain:true})
            user.password=null
            req.session.user = user
            req.session.loggedIn=true
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
})
// log in
router.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ where: { email: email } }).then((data) => {
        console.log(data, "Saduma")
        let valid = bcrypt.compareSync(password, data.password)
        if (valid) {
            let user=data.get({plain:true})
            user.password=null
            req.session.user = user
            req.session.loggedIn=true
            return res.json(data)
        }
        return res.status(400).json({ error: "Incorrect password" })
    }).catch((err) => {
        console.log(err)
        return res.status(401).json(err)
    })
})
// change password
router.put("/:id", (req, res) => {
    let { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    User.update({ password })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
// get a user
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
router.get("/", (req, res) => {
    User.findAll()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
module.exports = router