import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRooms } from "../../actions/roomActions";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

class Room extends Component {
  componentDidMount() {
    this.props.getRooms();
  }

  editRoom = (e, id, room, status) => {
    e.preventDefault();

    this.props.history.push({
      pathname: `add-room`,
      state: { roomId: id, roomName: room, status: status }
    });
  };

  render() {
    const { rooms } = this.props.room;
    let roomItems;

    if (rooms === null || rooms.length === 0) {
      roomItems = <h4>No room found...</h4>;
    } else {
      roomItems = (
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Room</th>
              <th>Created Date</th>
              <th>Edit Date</th>
              <th>Status</th>
              <th />
            </tr>
          </MDBTableHead>
          {rooms.map(data => (
            <MDBTableBody key={data._id}>
              <tr>
                <td>{data.roomName}</td>
                <td>{data.createdAt}</td>
                <td>{data.modifiedAt}</td>
                <td>{data.status}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={e =>
                      this.editRoom(e, data._id, data.roomName, data.status)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </MDBTableBody>
          ))}
        </MDBTable>
      );
    }

    return (
      <div className="room-admin">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/api/add-room" className="btn btn-dark">
                Add New Room
              </Link>
              <div className="room-items">{roomItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  getRooms: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room
});

export default connect(
  mapStateToProps,
  { getRooms }
)(Room);
