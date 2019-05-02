import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { addRoom } from "../../actions/adminActions";
import { Input } from "react-input-component";
import isEmpty from "../../validation/isEmpty";

class RoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      status: "",
      roomId: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelect = e => {
    this.setState({
      status: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const room = this.state.roomName;
    const status = this.state.status;

    if (isEmpty(room)) {
      this.setState({
        errors: { roomName: "Room name is required" }
      });
    } else if (isEmpty(status)) {
      this.setState({
        errors: { status: "Status is required" }
      });
    } else {
      const newRoom = {
        roomId: this.state.roomId,
        roomName: room,
        status: status
      };

      this.props.addRoom(newRoom, this.props.history);
    }
  };

  componentDidMount() {
    if (this.props.location.state) {
      const room = this.props.location.state.roomName;
      const status = this.props.location.state.status;
      const id = this.props.location.state.roomId;

      this.setState({ roomName: room, status: status, roomId: id });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="room-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-dark text-white">Add / Edit Room</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <Input name="roomId" value={this.state.roomId} type="hidden" />
                <TextFieldGroup
                  placeholder="Room Name"
                  name="roomName"
                  value={this.state.roomName}
                  onChange={this.onChange}
                  error={errors.roomName}
                />

                <select
                  className="form-control form-control-lg"
                  value={this.state.status}
                  onChange={this.onSelect}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <p className="error">{errors.status}</p>
              </div>
              <button type="submit" className="btn btn-dark btn-block mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RoomForm.propTypes = {
  addRoom: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRoom }
)(RoomForm);
