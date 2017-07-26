import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "../icons/Icon";
import { setCurrentStation } from "../../actions";
import "./Station.css";

const StationComponent = ({
  handleStationClick,
  id,
  station,
  empty,
  currentStation
}) => {
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
    handleStationClick(station);
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

StationComponent.propTypes = {
  dispatch: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.number,
  station: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentStation: state.currentStation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleStationClick: station => {
      dispatch(setCurrentStation(station));
    }
  };
};

const Station = connect(mapStateToProps, mapDispatchToProps)(StationComponent);

export default Station;
