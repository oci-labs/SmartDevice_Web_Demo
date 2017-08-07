import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import { CSSTransitionGroup } from "react-transition-group";
import "./Alerts.css";

import { getAllAlerts, snoozeAlert } from "../../actions";

class AlertsComponent extends Component {
  componentWillMount() {
    this.props.handleGetAllAlerts(30);
  }

  render() {
    let alertList;
    let inactiveAlertList;
    let snoozedAlertList;
    const { alerts, handleUpdateAlert } = this.props;

    if (alerts) {
      let activeAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === true && alert.isSnoozed === false;
      });
      let inactiveAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === false;
      });
      let snoozedAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === true && alert.isSnoozed === true;
      });

      activeAlerts.sort(
        (a, b) =>
          new Date(a.detectionTime) < new Date(b.detectionTime)
            ? 1
            : new Date(a.detectionTime) > new Date(b.detectionTime) ? -1 : 0
      );
      inactiveAlerts.sort(
        (a, b) =>
          new Date(a.detectionTime) < new Date(b.detectionTime)
            ? 1
            : new Date(a.detectionTime) > new Date(b.detectionTime) ? -1 : 0
      );
      snoozedAlerts.sort(
        (a, b) =>
          new Date(a.detectionTime) < new Date(b.detectionTime)
            ? 1
            : new Date(a.detectionTime) > new Date(b.detectionTime) ? -1 : 0
      );
      alertList = activeAlerts.map((alert, i) =>
        <ValveAlert
          key={"alert-" + i}
          id={"alert-" + alert.id}
          leftIcon
          isActive={alert.isActive}
          isSnoozed={alert.isSnoozed}
          alertType={alert.alertType}
          time={alert.detectionTime}
          handleUpdate={handleUpdateAlert}
        />
      );
      inactiveAlertList = inactiveAlerts.map(alert =>
        <ValveAlert
          key={alert.id}
          id={alert.id}
          leftIcon
          isActive={alert.isActive}
          isSnoozed={alert.isSnoozed}
          alertType={alert.alertType}
          time={alert.detectionTime}
          handleUpdate={handleUpdateAlert}
        />
      );
      snoozedAlertList = snoozedAlerts.map(alert =>
        <ValveAlert
          key={alert.id}
          id={alert.id}
          leftIcon
          isActive={alert.isActive}
          isSnoozed={alert.isSnoozed}
          alertType={alert.alertType}
          time={alert.detectionTime}
          handleUpdate={handleUpdateAlert}
        />
      );
    }
    return (
      <div className="alertsContainer">
        <CSSTransitionGroup
          transitionName="alerts"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={100}
        >
          {alertList}
          {snoozedAlertList}
          {inactiveAlertList}
        </CSSTransitionGroup>
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
      dispatch(snoozeAlert(alert));
    }
  };
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default Alerts;
