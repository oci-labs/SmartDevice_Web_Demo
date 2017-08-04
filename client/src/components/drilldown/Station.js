import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "../icons/Icon";
import { setSelectedItem } from "../../actions";
import "./Station.css";

const Station = ({ onClick, id, station, empty, currentStation }) => {
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
  return (
    <div
      className={`stationWrapper ${currentStation.id === station.id
        ? "active"
        : ""}`}
    >
      <div className="stationContainer" onClick={onStationClick}>
        <div className="stationIndicator" />
        <div
          className={`${currentStation.id === station.id
            ? "stationActiveIndicator"
            : ""}`}
        >
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
  station: PropTypes.object
};

export default Station;
