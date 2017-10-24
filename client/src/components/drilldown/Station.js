import React from "react";
import PropTypes from "prop-types";

import Icon from "../icons/Icon";
import "./Station.css";


//TODO: station prop now includes valve data structure (station.valve) - use that here to render valve details
const Station = ({onClick, id, station, empty, currentStation, inFault}) => {

  if (empty) {
    return (
      <div className="stationWrapper">
        <div className="stationEmptyContainer">
          <Icon type="add"/>
        </div>
      </div>
    );
  }
  const onStationClick = () => {
    onClick(station);
  };
  const isActive = currentStation.id === station.id;


  return (
    <div
      className={`stationWrapper ${isActive ? "active" : ""} ${inFault
        ? "fault"
        : ""}`}
    >
      <div className="stationContainer" onClick={onStationClick}>
        <div className="stationIndicator"/>
        <div className={`${isActive ? "stationActiveIndicator" : ""}`}>
          <div className="stationLabel">
            {id}
          </div>
        </div>
      </div>
    </div>
  );
};

Station.propTypes = {
  dispatch: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.number,
  station: PropTypes.object,
  inFault: PropTypes.bool
};

export default Station;
