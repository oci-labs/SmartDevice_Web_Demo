import React, { Component } from "react";
import { connect } from "react-redux";
import { IconAlarm } from "../icons/NexmatixIcons";
import "./Alerts.css";
import { snoozeAlert } from "../../actions";

class SnoozeDropdownComponent extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleSnoozeAlertClick = this.handleSnoozeAlertClick.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleSnoozeAlertClick(duration) {
    console.log(duration);
    let snoozedAlert = {
      key: "value"
    }
    this.props.handleSnoozeAlert(snoozedAlert);
  }
  render() {
    return (
      <div className={this.state.dropdownOpen ? "snoozeWrapper open" : "snoozeWrapper closed"}>
        <div className="snoozeOverlay" onClick={this.toggle}></div>
        <span onClick={this.toggle}><IconAlarm width="24" height="24" color="#fff" /></span>
        <div className="snoozeOptions">
        <ul>
          <li onClick={() => this.handleSnoozeAlertClick(1000 * 60 * 5)}>5 minutes</li>
          <li onClick={() => this.handleSnoozeAlertClick(1000 * 60 * 60)}>1 hour</li>
          <li onClick={() => this.handleSnoozeAlertClick(1000 * 60 * 60 * 24)}>1 day</li>
        </ul>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSnoozeAlert: function(alert) {
      dispatch(snoozeAlert(alert));
    }
  };
}

const SnoozeDropdown = connect(null, mapDispatchToProps)(SnoozeDropdownComponent);

export default SnoozeDropdown;