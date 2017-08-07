import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../icons/Icon";
import { SERVER_URL } from "../../config";
import "./Station.css";

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inFault: false
    };
  }
  getValve = station => {
    fetch(`${SERVER_URL}/api/valve/station/${station.number}`)
      .then(response => response.json())
      .then(response => {
        this.valve = response;
        this.getValveStatus();
      });
  };
  getValveStatus = () => {
    if (this.valve) {
      fetch(`${SERVER_URL}/api/valveStatus/${this.valve.serialNumber}`)
        .then(response => response.json())
        .then(response => {
          const latestStatus = response[0];
          if (latestStatus) {
            this.setState({
              inFault:
                latestStatus.cycleCount > latestStatus.cycleCountLimit ||
                latestStatus.leak !== "N" ||
                latestStatus.pressureFault !== "N"
            });
          }
        });
    }
    this.timeout = setTimeout(this.getValveStatus, 5000);
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.station) {
      this.getValve(nextProps.station);
    }
  }
  render() {
    const { onClick, id, station, empty, currentStation } = this.props;
    if (empty) {
      return (
        <div className="stationWrapper">
          <div className="stationEmptyContainer">
            <Icon type="add" />
          </div>
        </div>
      );
    }
    const onStationClick = () => {
      onClick(station);
    };
    const isActive = currentStation.id === station.id;
    const { inFault } = this.state;
    return (
      <div
        className={`stationWrapper ${isActive ? "active" : ""} ${inFault
          ? "fault"
          : ""}`}
      >
        <div className="stationContainer" onClick={onStationClick}>
          <div className="stationIndicator" />
          <div className={`${isActive ? "stationActiveIndicator" : ""}`}>
            <div className="stationLabel">
              {id}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Station.propTypes = {
  dispatch: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.number,
  station: PropTypes.object
};

export default Station;
