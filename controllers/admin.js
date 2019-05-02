const moment = require("moment");
require("moment-timezone");

module.exports = function(Room, History, EventLog) {
  return {
    SetRouting: function(router) {
      router.get("/api/history", this.history);
      router.get("/api/eventlog", this.eventLog);
      router.get("/api/room", this.getAdminRooms);
      router.post("/api/add-room", this.addRoom);
    },

    // get histories
    history: function(req, res) {
      History.find()
        .then(history => res.json(history))
        .catch(err => res.status(404).json({ nohistory: "No history found" }));
    },

    // get event logs
    eventLog: function(req, res) {
      EventLog.find()
        .then(eventLog => res.json(eventLog))
        .catch(err => res.status(404).json({ noevent: "No event found" }));
    },

    // get rooms
    getAdminRooms: function(req, res) {
      const errors = {};

      Room.find({})
        .then(rooms => res.json(rooms))
        .catch(err => res.status(404).json({ noroomfound: "No posts found" }));
    },

    // add, edit a room
    addRoom: function(req, res) {
      let roomData = {};
      if (req.body.roomId) {
        roomData = {
          roomName: req.body.roomName,
          status: req.body.status,
          modifiedAt: moment()
            .tz("America/New_York")
            .format("YYYY-MM-DD HH:mm:ss")
        };
      } else {
        roomData = {
          roomName: req.body.roomName,
          status: req.body.status,
          createdAt: moment
            .tz("America/New_York")
            .format("YYYY-MM-DD HH:mm:ss"),
          modifiedAt: moment
            .tz("America/New_York")
            .format("YYYY-MM-DD HH:mm:ss")
        };
      }

      if (req.body.roomId) {
        Room.findOne({ _id: req.body.roomId }).then(room => {
          if (room) {
            // Update a room
            Room.findOneAndUpdate(
              { _id: req.body.roomId },
              { $set: roomData },
              { new: true }
            ).then(room => res.json(room));
          }
        });
      } else {
        // Create a room
        new Room(roomData).save().then(room => res.json(room));
      }
    }
  };
};
