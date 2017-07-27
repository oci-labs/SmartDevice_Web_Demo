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
    const self = this;
    let sortedAlerts;
    if (this.props.alerts) {
      let alerts = this.props.alerts.map((alert) => {
        const handleDismiss = () => {
          self.props.handleUpdateList()
        }
      });
      sortedAlerts = alerts.slice().sort(compareAlerts);
        return (
            <ValveAlert
              key={alert.id}
              leftIcon="Disconnected"
              isActive={alert.isActive}
              valveNumber={alert.valveSerial}
              alertType={alert.alertType}
              station={alert.station.id}
              time={alert.thrownAt}

            />
        )
    }
      return (
          <div className="alertsContainer">
              {sortedAlerts}
          </div>
      );
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
