module.exports = function(async, Users, Room, History) {
  return {
    SetRouting: function(router) {
      router.get("/room", this.getRooms);
      router.get("/room/:room", this.getChannel);
    },

    // Get room list
    getRooms: function(req, res) {
      Room.find({})
        .then(rooms => res.json(rooms))
        .catch(err => res.status(404).json({ noroomfound: "No room found" }));
    },

    // get a room
    getChannel: function(req, res) {
      Room.find({})
        .then(rooms => res.json(rooms))
        .catch(err => res.status(404).json({ noroomfound: "No room found" }));
    }
  };
};
