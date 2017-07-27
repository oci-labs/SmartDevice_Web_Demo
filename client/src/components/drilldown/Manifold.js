import React, { Component } from "react";
import { connect } from "react-redux";
import Station from "./Station";
import "./Manifold.css";

import { setCurrentStation } from "../../actions";

class ManifoldComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStation: {}
    };
  }

  render() {
    let stations = [];
    if (this.props.manifold && this.props.manifold.stations) {
      stations = this.props.manifold.stations
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
  }
}

const mapStateToProps = state => {
  return {
    currentStation: state.currentStation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSetCurrentStation: station => {
      dispatch(setCurrentStation(station));
    }
  };
};

const Manifold = connect(mapStateToProps, mapDispatchToProps)(
  ManifoldComponent
);

export default Manifold;
