import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import { CSSTransitionGroup } from "react-transition-group";
import "./Alerts.css";

import { getAlerts, showValve, snoozeAlert } from "../../actions";

class AlertsComponent extends Component {
  constructor(props) {
    super(props);
    this.setAlertCheck();
  }
  setAlertCheck = () => {
    this.props.handleGetAlerts(30);
    this.timeout = setTimeout(() => {
      this.setAlertCheck();
    }, 5000);
  };
  render() {
    let alertList;
    let inactiveAlertList;
    let snoozedAlertList;
    const { alerts, handleAlertClick } = this.props;

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
          alert={alert}
          leftIcon
          isActive={alert.isActive}
          isSnoozed={alert.isSnoozed}
          alertType={alert.alertType}
          time={alert.detectionTime}
          onAlertClick={handleAlertClick}
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
        />
      );
    }
    return (
      <div className="alertBar">
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
    handleAlertClick: function(valve) {
      dispatch(showValve(valve));
    },
    handleGetAlerts: function(count) {
      dispatch(getAlerts(count));
    }
  };
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default Alerts;
