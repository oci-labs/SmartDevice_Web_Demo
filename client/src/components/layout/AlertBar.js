import React from "react";
import { connect } from "react-redux";
import Alerts from "../alerts/Alerts";
import "./AlertBar.css";

const AlertBarComponent = ({ viewAlerts }) => {
  return (
    <div className={`alertBar ${viewAlerts ? "show" : ""}`}>
      <Alerts />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    viewAlerts: state.viewAlerts
  };
};

const AlertBar = connect(mapStateToProps)(AlertBarComponent);

export default AlertBar;
