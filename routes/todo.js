const router = require("express").Router();
const Todo = require("../models/Todo");

// routes
router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    const { userEmail } = req.body;
    const { AddDate } = req.body;
    const newTodo = new Todo({ todo, userEmail, AddDate });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Note : A New task has been added");
        res.redirect("/home");
      })
      .catch((err) => console.log(err));
  })

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Note : A task has been deleted");
        res.redirect("/home");
      })
      .catch((err) => console.log(err));
  });

module.exports = router;
