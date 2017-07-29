import React from "react";
import Station from "./Station";
import "./Manifold.css";

const Manifold = ({ manifold }) => {
  let stations = [];
  if (manifold && manifold.children) {
    stations = manifold.children
      .sort(function(a, b) {
        return a.id - b.id;
      })
      .map(function(station, index) {
        return <Station id={++index} key={station.id} station={station} />;
      });
  }

  while (stations.length < 9) {
    stations.push(<Station key={stations.length + 1} empty="true" />);
  }

  return (
    <div className="manifoldContainer">
      {stations}
    </div>
  );
};

export default Manifold;
