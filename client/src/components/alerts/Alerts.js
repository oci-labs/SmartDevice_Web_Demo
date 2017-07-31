import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import "./Alerts.css";

import { getAllAlerts, updateAlert } from "../../actions";

class AlertsComponent extends Component {
  componentWillMount() {
    this.props.handleGetAllAlerts(1000);
  }
  render() {
    let sortedAlerts;
    let alertList;

    function compareAlerts(a, b) {
      // Use toUpperCase() to ignore character casing
      const activeA = a.isActive;
      const activeB = b.isActive;

      let comparison = 0;
      if (activeA > activeB) {
        comparison = -1;
      } else if (activeA < activeB) {
        comparison = 1;
      }
      return comparison;
    }

    if (this.props.alerts) {
      let alerts = this.props.alerts;
      sortedAlerts = alerts.slice().sort(compareAlerts);
      alertList = sortedAlerts.map((alert) => {
        return (
          <ValveAlert
            key={alert.id}
            id={alert.id}
            leftIcon="Disconnected"
            isActive={alert.isActive}
            valveNumber={alert.valveSerial}
            alertType={alert.alertType}
            station="6/6"
            time={alert.thrownAt}
            handleUpdate={this.props.handleUpdateAlert}
          />
        );
      });
    }
    return (
      <div className="alertsContainer">
        {alertList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleGetAllAlerts: function(count) {
      dispatch(getAllAlerts(count));
    },
    handleUpdateAlert: function(alert) {
      dispatch(updateAlert(alert));
    }
  };
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default Alerts;
