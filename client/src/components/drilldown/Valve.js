import React, { Component } from "react";
import Icon from "../icons/Icon";
import "./Valve.css";

class Valve extends Component {
  render() {
    if (this.props.empty) {
      return (
        <div className="valveWrapper">
          <div className="valveEmptyContainer">
            <Icon type="add" />
          </div>
        </div>
      );
    }
    return (
      <div className={`valveWrapper ${this.props.active ? "active" : ""}`}>
        <div className="valveContainer">
          <div className="valveIndicator" />
          <div className={`${this.props.active ? "valveActiveIndicator" : ""}`}>
            <div className="valveLabel">
              {this.props.id}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Valve;
