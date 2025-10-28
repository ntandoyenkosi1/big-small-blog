const router = require("express").Router();
const _Chat = require("../../models/chat");
const Chat = _Chat.default || _Chat;

// create Chat
router.post("/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const userId = req.session?.user?.id == senderId ? receiverId : senderId;
    const doc = await Chat.create({ ...req.body, User1: req.session?.user?.id, User2: userId });
    res.json(doc);
  } catch (err) {
    res.status(401).json(err);
  }
});

router.get("/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const data = await Chat.find({ User1: senderId, User2: receiverId }).lean();
    const data1 = await Chat.find({ User1: receiverId, User2: senderId }).lean();
    const merged = [...data, ...data1].sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
    res.json(merged);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
