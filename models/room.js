const mongoose = require("mongoose");

const roomNames = mongoose.Schema({
  roomName: { type: String, default: "" },
  status: { type: String, default: "" },
  createdAt: { type: String, default: "" },
  modifiedAt: { type: String, default: "" }
});

module.exports = mongoose.model("Room", roomNames);
