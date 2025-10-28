const router = require("express").Router();
const bcrypt = require("bcrypt");
const _User = require("../../models/user");
const User = _User.default || _User;

// sign up
router.post("/signup", async (req, res) => {
    try {
        let { name, email, password, image } = req.body;
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        const data = await User.create({ name, password, email, image });
        const user = data.toObject ? data.toObject() : data;
        if (user.password) user.password = null;
        req.session.user = user;
        req.session.loggedIn = true;
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// log in
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await User.findOne({ email });
        if (!data) return res.status(401).json({ error: 'User not found' });
        const valid = bcrypt.compareSync(password, data.password);
        if (valid) {
            const user = data.toObject ? data.toObject() : data;
            if (user.password) user.password = null;
            req.session.user = user;
            req.session.loggedIn = true;
            return res.json(data);
        }
        return res.status(400).json({ error: "Incorrect password" });
    } catch (err) {
        console.log(err);
        return res.status(401).json(err);
    }
});

// change password
router.put("/:id", async (req, res) => {
    try {
        let { password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        const data = await User.findByIdAndUpdate(req.params.id, { password }, { new: true });
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a user
router.get("/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router