const router = require("express").Router();
const _Comment = require("../../models/comment");
const Comment = _Comment.default || _Comment;

// create Comment
router.post("/", async (req, res) => {
    try {
        const doc = await Comment.create({ ...req.body, likes: 0, UserId: req.session?.user?.id });
        res.json(doc);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.put("/:id/like", async (req, res) => {
    try {
        const existingComment = await Comment.findById(req.params.id);
        if (!existingComment) return res.status(404).json({ error: 'Not found' });
        existingComment.likes = (existingComment.likes || 0) + 1;
        await existingComment.save();
        res.json(existingComment);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Comment.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Comment.find();
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const data = await Comment.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router