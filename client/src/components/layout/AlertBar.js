import React, { Component } from "react";
import Alerts from "../alerts/Alerts";

import "./AlertBar.css";

class AlertBar extends Component {
  render() {
    return <div className="alertBar">
      <Alerts />
    </div>;
  }
}

export default AlertBar;
