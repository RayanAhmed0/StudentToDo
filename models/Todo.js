const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,

    required: true,
  }, userEmail: {
    type: String,
    required: true,
  },
  AddDate: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model("Todo", TodoSchema);