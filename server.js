const PORT = process.env.PORT || "5000";
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const socketIO = require("socket.io");
const { Users } = require("./helpers/UserClass");
const History = require("./models/history");
const EventLog = require("./models/eventlog");
const container = require("./container");
const db = require("./config/keys").mongoURI;

container.resolve(function(_, auth, admin, room) {
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  mongoose
    .connect(db, { useNewUrlParser: true })
    .catch(err => console.log(err));

  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    const io = socketIO(server);
    server.listen(PORT, function() {
      console.log("Server running on port 5000");
    });

    ConfigureExpress(app, io);

    require("./socket/chat")(io, Users, History, EventLog);

    //Setup router
    const router = require("express-promise-router")();
    auth.SetRouting(router);
    admin.SetRouting(router);
    room.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app, io) {
    require("./passport/passport-local");

    app.use(cookieParser());

    // Body parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(validator());

    app.use(
      session({
        secret: "secretkey",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      })
    );

    app.use(flash());

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.locals._ = _;
  }
});
