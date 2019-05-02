const mongoose = require("mongoose");

const history = mongoose.Schema({
  user: { type: String },
  room: { type: String },
  message: { type: String },
  createdAt: { type: String },
  time: { type: String }
});

module.exports = mongoose.model("History", history);
