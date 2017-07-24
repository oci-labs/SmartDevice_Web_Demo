import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../icons/Icon";
import "./Valve.css";

class Valve extends Component {
  constructor(props) {
    super(props);

    this.makeActive = this.makeActive.bind(this);
  }
  makeActive() {
    this.props.makeActive(this.props.valve);
  }

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
        <div className="valveContainer" onClick={this.makeActive}>
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

Valve.propTypes = {
  active: PropTypes.bool,
  valve: PropTypes.object
};

export default Valve;
