const auth = require("../middleware/auth");
const router = require("express").Router();
const _Post = require("../models/post");
const _Comment = require("../models/comment");
const _User = require("../models/user");
const _Chat = require("../models/chat");
const Post = _Post.default || _Post;
const Comment = _Comment.default || _Comment;
const User = _User.default || _User;
const Chat = _Chat.default || _Chat;

router.get("/", async (req, res) => {
  res.render("homepage",{ loggedIn: req.session.loggedIn });
});

router.get("/posts", async (req, res) => {
  let posts = await Post.find().lean();
  posts = await Promise.all(
    posts.map(async (x) => {
      const comments = await Comment.find({ PostId: x._id }).lean();
      x.Comments = comments;
      x.loggedIn = req.session.loggedIn;
      x.commentsCount = comments.length;
      return x;
    })
  );
  res.render("posts", { posts, loggedIn: req.session.loggedIn });
});

router.get("/posts/create", (req, res) => {
  res.render("create", { loggedIn: req.session.loggedIn });
});

router.get("/posts/:id", async (req, res) => {
  let post = await Post.findById(req.params.id).lean();
  const comments = await Comment.find({ PostId: req.params.id }).lean();
  post.Comments = comments.map((c) => {
    c.loggedIn = req.session.loggedIn;
    return c;
  });
  res.render("post", { post, loggedIn: req.session.loggedIn });
});

router.get("/posts/edit/:id", auth, async (req, res) => {
  let post = await Post.findById(req.params.id).lean();
  res.render("edit", { post, loggedIn: req.session.loggedIn });
});

router.get("/posts/delete/:id", auth, (req, res) => {
  res.render("delete", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard", auth, async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  let posts = await Post.find({ UserId: req.session.user.id }).lean();
  console.log(posts)
  res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) return res.redirect("/dashboard");
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("signup");
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.get("/chat/:id", async (req, res) => {
  if (req.session.loggedIn) {
    let user = await User.findById(req.params.id).lean();
    const senderId = user._id;
    const receiverId = req.session.user.id;
    const data = await Chat.find({ User1: senderId, User2: receiverId }).lean();
    const data1 = await Chat.find({ User1: receiverId, User2: senderId }).lean();
    let chats = [...data, ...data1].sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
    chats = chats.map((chat) => {
      if (String(chat.User1) == String(req.session.user.id)) {
        chat.class = true;
      } else if (String(chat.User2) == String(req.session.user.id)) {
        chat.class = false;
      }
      return chat;
    });
    res.render("chat", { user, me: req.session.user.id, chats });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
