const { Post, Comment, User } = require("../models");
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
router.get("/users/:id", async (req, res) => {
  if (req.session.loggedIn) {
    let user = await User.findByPk(req.params.id);
    user = user.get({ plain: true });
    res.render("user", { user });
  } else {
    res.redirect("/");
  }
});
module.exports = router;
