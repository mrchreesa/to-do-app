const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "must provide an email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "must provide a password"],
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
