const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/lib");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const sess = {
  secret: process.env.SECRET_KEY || "mysecret",
  cookie: {
    maxAge: 9000000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/blog' }),
};

app.use(session(sess));

const hbs = exphbs.create({
  helpers,
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
})

module.exports = app