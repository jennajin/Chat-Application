import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRoom } from "../../actions/roomActions";
import Message from "./Message";

class Channel extends Component {
  componentDidMount() {
    this.props.getRoom(this.props.match.params.roomname);
  }

  render() {
    const roomName = this.props.match.params.roomname;

    return (
      <div className="mb-3">
        <Message roomName={roomName} />
      </div>
    );
  }
}

Channel.propTypes = {
  getRoom: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room
});

export default connect(
  mapStateToProps,
  { getRoom }
)(Channel);
