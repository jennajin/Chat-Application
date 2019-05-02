import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
import socketIOClient from "socket.io-client";

let socket = socketIOClient("http://localhost:5000");
const moment = require("moment-timezone");

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: this.props.location.state.userName,
      text: "",
      roomName: this.props.roomName,
      messages: [],
      errors: {},
      userList: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Back to main
  backToMain = e => {
    socket.disconnect();
    socket = null;
  };

  // Send a message
  sendMessage = e => {
    e.preventDefault();
    const msg = this.state.text;

    if (isEmpty(msg)) {
      this.setState({
        errors: { text: "The message is missing" }
      });
    } else {
      // send a message if text field is not empty
      const messageData = {
        sender: this.state.sender,
        text: this.state.text,
        room: this.props.roomName
      };

      socket.emit("createMessage", messageData);
      this.setState({ text: "" });
    }
  };

  componentDidMount() {
    // connect if socket is not connected
    if (!socket) {
      socket = socketIOClient("http://localhost:5000");
      socket.connect();
    }

    const roomName = this.props.roomName;

    let joinData = {
      room: roomName,
      name: this.props.location.state.userName
    };

    socket.emit("user connection", joinData);

    socket.emit("join", joinData);

    socket.on("newMessage", data => {
      this.setState({ messages: [...this.state.messages, data] });
    });

    socket.on("usersList", users => {
      this.setState({ userList: users });
    });
  }

  render() {
    const { errors } = this.state;
    const roomName = this.props.roomName;
    const userName = this.props.location.state.userName;
    const userList = this.state.userList;

    let { messages } = [];

    if (this.state.messages) {
      messages = this.state.messages;
    }

    let userItems = userList.map((item, index) => (
      <li key={index} className="list-items">
        {item}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-sm-7 col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="card-title message-head">{roomName}</div>
              <hr />
              <div className="message-body">
                {messages.map((message, key) => {
                  return (
                    <div key={key}>
                      <div>
                        <span className="sender">{message.sender}</span>
                        <span className="message-time">
                          {moment.tz("America/New_York").format("HH:mm")}
                        </span>
                      </div>
                      <div className="message-text">{message.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-footer">
              <p className="message-welcome">Welcome, {userName}</p>
              <input
                type="text"
                placeholder="Message"
                className="form-control"
                value={this.state.text}
                name="text"
                onChange={this.onChange}
                error={errors.text}
              />
              <br />
              <button
                className="btn btn-primary form-control"
                onClick={this.sendMessage}
              >
                Send
              </button>
              <Link to="/" className="btn btn-warning btn-block mt-4">
                <div onClick={this.backToMain}>Back</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-sm-4 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title list-head">
                Users <span id="list-num">({userList.length})</span>
              </div>
              <hr />
              <div className="list-body">{userItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  location: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Message));
