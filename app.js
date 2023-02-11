const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const Todo = require("./models/Todo");

const User = require("./models/User");

const authenticateUser = require("./middlewares/authenticateUser");

const app = express();

require('./startup/db')();
require('./startup/middleware')(app);
app.use(require("./routes/todo"))

// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);

// route for serving frontend files
app
  .get("/", (req, res) => {
    res.render("login");
  })
  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })

  .get("/home", authenticateUser, async (req, res) => {
    const allTodo = await Todo.find();

    res.render("home", { user: req.session.user, todo: allTodo });

  }).get("/list", authenticateUser, async (req, res) => {
    const allTodo = await Todo.find();
    res.render("list", { user: req.session.user, todo: allTodo });
  }).get("/about", authenticateUser, async (req, res) => {
    const allTodo = await Todo.find();
    res.render("about", { user: req.session.user, todo: allTodo });
  });

// route for handling post requirests
app
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) return res.send("Please enter all the fields");

    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits) return res.send("invalid username or password");

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) return res.send("invalid useranme or password");

    // else he\s logged in
    req.session.user = {
      email,
    };

    res.redirect("/home");
  })
  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) return res.send("Please enter all the fields");

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) return res.send("A user with that email already exits please try another one!");

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword });

    latestUser
      .save()
      .then(() => {
        res.redirect("/");
        res.send("registered account!");

      })
      .catch((err) => console.log(err));
  });

//logout
app.get("/logout", authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

// server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Note : Server is live on port : ${PORT}`);
});
