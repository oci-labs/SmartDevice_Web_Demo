import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import { CSSTransitionGroup } from 'react-transition-group'
import "./Alerts.css";

import { getAllAlerts, snoozeAlert } from "../../actions";

class AlertsComponent extends Component {
  componentWillMount() {
    this.props.handleGetAllAlerts(30);
  }

  render() {
    const self = this;
    let alertList;
    let inactiveAlertList;
    let snoozedAlertList;

    if (this.props.alerts) {
      let alerts = this.props.alerts;
      let activeAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === true && alert.isSnoozed=== false;
      });
      let inactiveAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === false;
      });
      let snoozedAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === true && alert.isSnoozed === true;
      });
      activeAlerts.sort(
        (a, b) =>
          new Date(a.thrownAt) < new Date(b.thrownAt)
            ? 1
            : new Date(a.thrownAt) > new Date(b.thrownAt) ? -1 : 0
      );
      inactiveAlerts.sort(
        (a, b) =>
          new Date(a.thrownAt) < new Date(b.thrownAt)
            ? 1
            : new Date(a.thrownAt) > new Date(b.thrownAt) ? -1 : 0
      );
      snoozedAlerts.sort(
        (a, b) =>
          new Date(a.thrownAt) < new Date(b.thrownAt)
            ? 1
            : new Date(a.thrownAt) > new Date(b.thrownAt)
      );
      alertList = activeAlerts.map(alert =>
              <ValveAlert
                key={alert.id}
                id={alert.id}
                leftIcon
                isActive={alert.isActive}
                isSnoozed={alert.isSnoozed}
                alertType={alert.alertType}
                time={alert.thrownAt}
                handleUpdate={self.props.handleUpdateAlert}
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
              time={alert.thrownAt}
              handleUpdate={self.props.handleUpdateAlert}
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
              time={alert.thrownAt}
              handleUpdate={self.props.handleUpdateAlert}
          />
      );
    }
    return (
      <div className="alertsContainer">
        <CSSTransitionGroup
            transitionName="alerts"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={100}>
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
