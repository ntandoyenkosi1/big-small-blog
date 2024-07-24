const { Post, Comment, User, Chat } = require("../models");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("homepage");
});
router.get("/posts", async (req, res) => {
  let posts = await Post.findAll({
    include: [{ model: Comment }, { model: User }],
  });
  posts = posts.map((x) => x.get({ plain: true }));
  posts?.map((x) => {
    x.loggedIn = req.session.loggedIn;
    x.commentsCount = x.Comments.length;
    return x;
  });
  res.render("posts", { posts, loggedIn: req.session.loggedIn });
});
router.get("/posts/create", (req, res) => {
  res.render("create", { loggedIn: req.session.loggedIn });
});
router.get("/posts/:id", async (req, res) => {
  let post = await Post.findByPk(req.params.id, {
    include: [{ model: Comment, include: User }, { model: User }],
  });
  post = post.get({ plain: true });
  post.Comments?.map((x) => (x.loggedIn = req.session.loggedIn));
  res.render("post", { post, loggedIn: req.session.loggedIn });
});
router.get("/posts/edit/:id", auth, async (req, res) => {
  let post = await Post.findByPk(req.params.id);
  post = post.get({ plain: true });
  res.render("edit", { post, loggedIn: req.session.loggedIn });
});
router.get("/posts/delete/:id", auth, (req, res) => {
  res.render("delete", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard", auth, async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  let posts = await Post.findAll(
    { where: { UserId: req.session.user.id } },
    { include: { model: Comment } }
  );
  posts = posts.map((x) => x.get({ plain: true }));
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
    let user = await User.findByPk(req.params.id);
    user = user.get({ plain: true });
    const senderId = user.id;
    const receiverId = req.session.user.id;
    //res.render("user", { user, me: req.session.user.id });
    Chat.findAll({ where: { User1: senderId, User2: receiverId } })
      .then((data) => {
        Chat.findAll({ where: { User1: receiverId, User2: senderId } })
          .then((data1) => {
            let chats = [...data, ...data1].sort(
              (a, b) => a.createdAt - b.createdAt
            );
            chats = chats.map((chat) => {
              chat = chat.get({ plain: true });
              if (chat.User1 == req.session.user.id) {
                chat.class = true;
              } else if (chat.User2 == req.session.user.id) {
                chat.class = false;
              }
              return chat;
            });
            res.render("chat", { user, me: req.session.user.id, chats });
          })
          .catch((err) => {
            console.log(err);
            //res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        //res.status(400).json(err);
      });
  } else {
    res.redirect("/login");
  }
});
module.exports = router;
