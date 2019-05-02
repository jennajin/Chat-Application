import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEventLog } from "../../actions/adminActions";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

class EventLog extends Component {
  componentDidMount() {
    this.props.getEventLog();
  }

  render() {
    const { eventLog } = this.props.admin;
    let eventItems;

    if (eventLog === null) {
      eventItems = <h4>No event found...</h4>;
    } else {
      eventItems = (
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>User</th>
            </tr>
          </MDBTableHead>
          {eventLog.map(data => (
            <MDBTableBody key={data._id}>
              <tr>
                <td>{data.eventType}</td>
                <td>{data.createdAt}</td>
                <td>{data.time}</td>
                <td>{data.user}</td>
              </tr>
            </MDBTableBody>
          ))}
        </MDBTable>
      );
    }

    return (
      <div className="eventLog">
        <div className="container">
          <h3 className="text-center text-header">Event Log</h3>
          {eventItems}
        </div>
      </div>
    );
  }
}

EventLog.propTypes = {
  getEventLog: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEventLog }
)(EventLog);
