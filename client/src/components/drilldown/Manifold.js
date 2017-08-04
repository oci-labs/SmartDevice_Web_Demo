import React from "react";
import { connect } from "react-redux";
import Station from "./Station";
import "./Manifold.css";

import { setSelectedItem } from "../../actions";

const ManifoldComponent = ({
  currentStation,
  handleStationClick,
  manifold
}) => {
  let stations = [];
  if (manifold && manifold.children) {
    stations = manifold.children
      .sort((a, b) => a.id - b.id)
      .map((station, index) =>
        <Station
          id={++index}
          key={station.id}
          station={station}
          currentStation={currentStation}
          onClick={handleStationClick}
        />
      );
  }

  while (stations.length < 9) {
    stations.push(<Station key={stations.length + 648} empty="true" />);
  }

  return (
    <div className="manifoldContainer">
      {stations}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentStation: state.currentStation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleStationClick: station => {
      dispatch(setSelectedItem(station));
    }
  };
};

const Manifold = connect(mapStateToProps, mapDispatchToProps)(
  ManifoldComponent
);

export default Manifold;
