import React, { Component } from "react";
import { Alert } from "reactstrap";
import Disconnect from "../icons/Disconnect";
import Gauge from "../icons/Gauge";
import Icon from "../icons/Icon";
import "./Alerts.css";

class ValveAlert extends Component {
  constructor(props) {
    super(props);

    this.state = { isActive: this.props.isActive };
  }

  onDismiss = () => {
    this.setState({ isActive: false });
    this.props.callback();
  };

  render() {
    const {
      color,
      leftIcon,
      valveNumber,
      station,
      alertType,
      time
    } = this.props;

    return (
      <Alert
        color={color === "disabled" ? "" : color || "danger"}
        className={this.state.isActive ? "" : "disabled"}
      >
        {leftIcon &&
          <div className="alert-icon-left" style={{ height: "24px" }}>
            {(() => {
              switch (leftIcon) {
                case "Disconnected":
                  return (
                    <Disconnect
                      size="24"
                      color={this.state.isActive ? "white" : "#777"}
                    />
                  );
                case "Gauge":
                  return (
                    <Gauge
                      size="24"
                      color={
                        this.state.isActive === "disabled" ? "white" : "#777"
                      }
                    />
                  );
                default:
                  return null;
              }
            })()}
          </div>}
        {/* this.props.alertContent */}
        <div className="alert-content">
          <strong>
            Valve {valveNumber}
          </strong>
          <br />
          <span className="alert-details">
            {alertType}: {station} - {time}
          </span>
        </div>
        <div
          className="alert-icon-right"
          style={{ height: "24px" }}
          onClick={this.onDismiss}
        >
          {this.state.isActive && <Icon type="cancel" className="image" />
          /* <MdNotificationsOff size={24} onClick={this.onDismiss}/>*/
          }
        </div>
      </Alert>
    );
  }
}

export default ValveAlert;
