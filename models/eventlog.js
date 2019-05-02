const mongoose = require("mongoose");

const eventLog = mongoose.Schema({
  eventType: { type: String },
  user: { type: String },
  createdAt: { type: String },
  time: { type: String }
});

module.exports = mongoose.model("EventLog", eventLog);
