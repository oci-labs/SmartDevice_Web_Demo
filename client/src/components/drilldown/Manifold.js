import React from "react";
import Station from "./Station";
import "./Manifold.css";

const Manifold = ({ currentStation, handleStationClick, manifold }) => {
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
          manifoldId={manifold.id}
          onClick={handleStationClick}
        />
      );
  }

  while (stations.length < 9) {
    stations.push(<Station key={stations.length + 648} empty="true" />);
  }

  if (stations.length > 10) {
    stations = stations.slice(10);
  }

  return (
    <div className="manifoldContainer">
      {stations}
    </div>
  );
};

export default Manifold;
