import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

// Layout
import Navbar from "./components/layout/Navbar";
import Main from "./components/layout/Main";

// Admin
import Login from "./components/auth/Login";
import Dashboard from "./components/admin/Dashboard";
import EventLog from "./components/admin/EventLog";
import RoomHistory from "./components/admin/RoomHistory";
import Room from "./components/admin/Room";
import AddRoom from "./components/admin/AddRoom";

// Guest
import RoomPanel from "./components/room/RoomPanel";
import Channel from "./components/room/Channel";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    //store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Main} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/room" component={RoomPanel} />
              <Route exact path="/room/:roomname" component={Channel} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/api/eventlog" component={EventLog} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/roomhistory"
                  component={RoomHistory}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/api/add-room" component={AddRoom} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/api/room" component={Room} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
