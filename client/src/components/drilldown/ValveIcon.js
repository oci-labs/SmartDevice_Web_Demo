import React, { Component } from "react";
import Icon from "../icons/Icon";
import "./ValveIcon.css";

class ValveIcon extends Component {
  render() {
    return (
      <div className="valveIconWrapper">
        <div className="iconContainer">
          <div
            className={`valveIconContainer ${this.props.warning
              ? "warning"
              : ""}`}
          >
            <div className="valveIconBorder">
              <Icon
                className="valveIconCheck"
                type={`${this.props.warning ? "dashboard" : "check"}`}
              />
            </div>
          </div>
        </div>
        <div className="valveIconLabel">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ValveIcon;
