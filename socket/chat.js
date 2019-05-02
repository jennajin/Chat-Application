const moment = require("moment");
require("moment-timezone");

module.exports = function(io, Users, History, EventLog) {
  const users = new Users();

  // socketIO connection
  io.on("connection", socket => {
    // connection
    socket.on("user connection", params => {
      // save event log
      saveEvent(
        "Connection",
        moment.tz("America/New_York").format("YYYY-MM-DD"),
        moment.tz("America/New_York").format("HH:mm:ss"),
        params.name
      );
    });

    // join
    socket.on("join", params => {
      // save event log
      saveEvent(
        "Join",
        moment.tz("America/New_York").format("YYYY-MM-DD"),
        moment.tz("America/New_York").format("HH:mm:ss"),
        params.name
      );

      socket.join(params.room); // join to the particular room
      users.AddUserData(socket.id, params.name, params.room);

      // update users' list
      io.to(params.room).emit("usersList", users.GetUsersList(params.room));
      let time = new Date();
      // echo to everyone that a new user has connected
      io.to(params.room).emit("newMessage", {
        text: `joined #${params.room}`,
        room: params.room,
        sender: params.name
      });

      // message
      socket.on("createMessage", (message, callback) => {
        // save history
        saveHistory(
          message.sender,
          message.room,
          message.text,
          moment.tz("America/New_York").format("YYYY-MM-DD"),
          moment.tz("America/New_York").format("HH:mm:ss")
        );

        io.to(message.room).emit("newMessage", {
          text: message.text,
          room: message.room,
          sender: message.sender,
          date: message.date
        });
      });

      socket.on("force disconnect", () => {
        socket.emit("disconnect");
      });

      // disconnect
      socket.on("disconnect", () => {
        let user = users.RemoveUser(socket.id);

        // save event log
        saveEvent(
          "Disconnect",
          moment.tz("America/New_York").format("YYYY-MM-DD"),
          moment.tz("America/New_York").format("HH:mm:ss"),
          user.name
        );

        // echo to everyone that a new user has disconnected
        io.to(user.room).emit("newMessage", {
          text: `disconnected #${user.room}`,
          room: user.room,
          sender: user.name
        });

        // update user list
        if (user) {
          io.to(user.room).emit("usersList", users.GetUsersList(user.room));
        }
      });

      // error
      socket.on("error", params => {
        // save event log
        saveEvent(
          "Error",
          moment.tz("America/New_York").format("YYYY-MM-DD"),
          moment.tz("America/New_York").format("HH:mm:ss"),
          params.name
        );
      });
    });

    // history
    let saveHistory = (user, room, msg, date, time) => {
      const history = new History();
      history.user = user;
      history.room = room;
      history.message = msg;
      history.createdAt = date;
      history.time = time;

      history.save(err => {
        if (err) {
          console.log(err);
        }
      });
    };

    // event log
    let saveEvent = (eventType, date, time, user) => {
      const eventLog = new EventLog();
      eventLog.eventType = eventType;
      eventLog.createdAt = date;
      eventLog.time = time;
      eventLog.user = user;

      eventLog.save((err, msg) => {
        if (err) {
          console.log(err);
        }
      });
    };
  });
};
