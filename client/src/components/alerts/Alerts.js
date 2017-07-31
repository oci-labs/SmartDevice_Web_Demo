import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import { CSSTransitionGroup } from 'react-transition-group'
import "./Alerts.css";

import { getAllAlerts, updateAlert } from "../../actions";

class AlertsComponent extends Component {
  componentWillMount() {
    this.props.handleGetAllAlerts(30);
  }

  render() {
    let alertList;
    let inactiveAlertList;
    const {handleUpdateAlert} = this.props;

    if (this.props.alerts) {
      let alerts = this.props.alerts;
      let activeAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === true;
      });
      let inactiveAlerts = [].concat(alerts).filter(alert => {
        return alert.isActive === false;
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
      alertList = activeAlerts.map(alert =>
              <ValveAlert
                key={alert.id}
                id={alert.id}
                leftIcon
                isActive={alert.isActive}
                alertType={alert.alertType}
                time={alert.thrownAt}
                handleUpdate={handleUpdateAlert}
              />
      );
      inactiveAlertList = inactiveAlerts.map(alert =>
          <ValveAlert
              key={alert.id}
              id={alert.id}
              leftIcon
              isActive={alert.isActive}
              alertType={alert.alertType}
              time={alert.thrownAt}
              handleUpdate={handleUpdateAlert}
          />
      );
    }
    return (
      <div className="alertsContainer">
        <CSSTransitionGroup
            transitionName="alerts"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {alertList}
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
      dispatch(updateAlert(alert));
    }
  };
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default Alerts;
