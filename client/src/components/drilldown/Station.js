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
    this.getValveStatus();
  }
  getValve = station => {
    fetch(
      `${SERVER_URL}/api/valve/station/${this.props
        .manifoldId}/${station.number}`
    )
      .then(response => response.json())
      .then(response => {
        if (response.error !== 404) {
          this.valve = response;
        } else {
          this.valve = undefined;
        }
      });
  };
  getValveStatus = () => {
    console.log("START GET VALVE STATUS", this.props.station);
    this.timeout = setTimeout(this.getValveStatus, 5000);
    if (this.valve) {
      console.log("GETTING VALVE STATUS", this.valve.serialNumber);
      fetch(`${SERVER_URL}/api/valveStatus/${this.valve.serialNumber}`)
        .then(response => response.json())
        .then(response => {
          const latestStatus = response[0];
          if (latestStatus) {
            console.log("LATEST STATUS", latestStatus);
            this.setState({
              inFault:
                latestStatus.cycleCount > latestStatus.cycleCountLimit ||
                latestStatus.leak !== "N" ||
                latestStatus.pressureFault !== "N"
            });
          }
        });
    } else if (this.props.station) {
      this.getValve(this.props.station);
    }
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentWillReceiveProps(nextProps) {}
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
