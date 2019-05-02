import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRooms } from "../../actions/roomActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class RoomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      selectedRoom: null,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // when user selects a room
  onSelect = e => {
    this.setState({
      selectedRoom: e.target.value
    });
  };

  // when user press the join button
  onSubmit = e => {
    e.preventDefault();

    const user = this.state.userName;
    const room = this.state.selectedRoom;

    if (isEmpty(user)) {
      this.setState({
        errors: { userName: "Username is required" }
      });
    } else if (isEmpty(room)) {
      this.setState({
        errors: { selectedRoom: "Room is required" }
      });
    } else {
      const roomData = {
        userName: user,
        roomName: room
      };
      if (roomData.roomName !== null && roomData.roomName !== "") {
        this.props.history.push({
          pathname: `/room/${roomData.roomName}`,
          state: { userName: roomData.userName }
        });
      }
    }
  };

  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    const { rooms } = this.props.room;
    const { errors } = this.state;
    let roomItems;

    if (rooms === null) {
      roomItems = <h4>No room found...</h4>;
    } else {
      roomItems = (
        <select
          className="form-control form-control-lg"
          onChange={this.onSelect}
        >
          <option value="">Select a Room</option>
          {rooms.map(room => (
            <option key={room._id} value={this.state.selectedRoom} 
            disabled={room.status === "Inactive" ? true : false}>
              {room.roomName}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div className="room mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Chat Application</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Username"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  error={errors.userName}
                />
              </div>
              <div className="form-group">
                {roomItems}
                <p className="error">{errors.selectedRoom}</p>
              </div>
              <button type="submit" className="btn btn-info btn-block mt-4">
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RoomPanel.propTypes = {
  getRooms: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRooms }
)(withRouter(RoomPanel));
