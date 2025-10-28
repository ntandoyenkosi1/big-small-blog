const router = require("express").Router();

const _Post = require("../../models/post");
const _Comment = require("../../models/comment");
const Post = _Post.default || _Post;
const Comment = _Comment.default || _Comment;

// create post
router.post("/", async (req, res) => {
    try {
        const doc = await Post.create({ ...req.body, likes: 0, UserId: req.session?.user?.id });
        res.json(doc);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.put("/:id/like", async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id);
        if (!existingPost) return res.status(404).json({ error: 'Not found' });
        existingPost.likes = (existingPost.likes || 0) + 1;
        await existingPost.save();
        res.json(existingPost);
    } catch (err) {
        res.status(401).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (!post) return res.status(404).json({ error: 'Not found' });
        const comments = await Comment.find({ PostId: req.params.id }).lean();
        res.json({ ...post, Comments: comments });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().lean();
        // attach comments for each post
        const withComments = await Promise.all(
            posts.map(async (p) => {
                const comments = await Comment.find({ PostId: p._id }).lean();
                return { ...p, Comments: comments };
            })
        );
        res.json(withComments);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const removed = await Post.findByIdAndDelete(req.params.id);
        res.json(removed);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;