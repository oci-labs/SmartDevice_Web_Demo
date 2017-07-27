import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import "./Alerts.css";

import { getAllAlerts } from "../../actions";

class AlertsComponent extends Component {
  componentWillMount() {
    this.props.handleGetAllAlerts();
  }
  render() {
    const self = this;
    let alerts;
    if (this.props.alerts) {
      alerts = this.props.alerts.map((alert) => {
        const handleDismiss = () => {
          self.props.handleUpdateList()
        }
      });
    }
  }




}

function mapStateToProps(state) {
  console.log(state);
  return {
    alerts: state.alerts
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleGetAllAlerts: function() {
      dispatch(getAllAlerts());
    }
  };
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default Alerts;
