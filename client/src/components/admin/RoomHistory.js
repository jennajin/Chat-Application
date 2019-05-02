import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoomHistory } from "../../actions/adminActions";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

class RoomHistory extends Component {
  componentDidMount() {
    this.props.getRoomHistory();
  }

  render() {
    const { roomHistory } = this.props.admin;
    let historyItems;

    if (roomHistory === null) {
      historyItems = <h4>No history found...</h4>;
    } else {
      historyItems = (
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Sender</th>
              <th>Message</th>
              <th>Room</th>
            </tr>
          </MDBTableHead>
          {roomHistory.map(data => (
            <MDBTableBody key={data._id}>
              <tr>
                <td>{data.createdAt}</td>
                <td>{data.time}</td>
                <td>{data.user}</td>
                <td>{data.message}</td>
                <td>{data.room}</td>
              </tr>
            </MDBTableBody>
          ))}
        </MDBTable>
      );
    }

    return (
      <div className="eventLog">
        <div className="container">
          <h3 className="text-center text-header">Chat History</h3>
          {historyItems}
        </div>
      </div>
    );
  }
}

RoomHistory.propTypes = {
  getRoomHistory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRoomHistory }
)(RoomHistory);
