import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import "./Alerts.css";

import { getAllAlerts, updateAlert } from "../../actions";

class AlertsComponent extends Component {
  componentWillMount() {
    this.props.handleGetAllAlerts(30);
  }

  render() {
    const self = this;
    let alertList;

    if (this.props.alerts) {
      let alerts = this.props.alerts;
      let activeAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === true;
      });
      let inActiveAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === false;
      });
      activeAlerts.sort(
        (a, b) =>
          new Date(a.thrownAt) < new Date(b.thrownAt)
            ? 1
            : new Date(a.thrownAt) > new Date(b.thrownAt) ? -1 : 0
      );
      inActiveAlerts.sort(
        (a, b) =>
          new Date(a.thrownAt) < new Date(b.thrownAt)
            ? 1
            : new Date(a.thrownAt) > new Date(b.thrownAt) ? -1 : 0
      );
      alertList = activeAlerts
        .concat(inActiveAlerts)
        .map(alert =>
          <ValveAlert
            key={alert.id}
            id={alert.id}
            leftIcon
            isActive={alert.isActive}
            alertType={alert.alertType}
            time={alert.thrownAt}
            handleUpdate={self.props.handleUpdateAlert}
          />
        );
      console.log(alertList);
    }
    return (
      <div className="alertsContainer">
        {alertList || "No Alerts"}
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
