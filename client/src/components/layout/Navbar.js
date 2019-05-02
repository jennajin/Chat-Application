import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import socketIOClient from "socket.io-client";

let socket = socketIOClient("http://localhost:5000");

class Navbar extends Component {
  clickNav = e => {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log(socket.id);
    }
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  componentDidMount() {}

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/api/eventlog">
              {" "}
              Event History
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/roomhistory">
              {" "}
              Chat History
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/room">
              {" "}
              Rooms
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={this.clickNav}>
              Admin Login
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light  mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={this.clickNav}>
            <div className="chat-app">ChatApp</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
