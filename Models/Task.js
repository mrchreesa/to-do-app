const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "must provide content"],
  },
  done: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Task", taskSchema);
