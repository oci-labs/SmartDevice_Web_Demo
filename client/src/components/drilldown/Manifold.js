import React, { Component } from "react";
import Valve from "./Valve";
import "./Manifold.css";

class Manifold extends Component {
  constructor(props) {
    super(props);

    this.makeValveActive = this.makeValveActive.bind(this);

    this.state = {
      activeValveId: null
    };
  }
  makeValveActive(valve) {
    this.setState({
      activeValveId: valve.id
    });
  }

  render() {
    let self = this;
    let valves = [];
    if (this.props.manifold) {
      valves = this.props.manifold.stations.map(function(valve, index) {
        return (
          <Valve
            id={++index}
            key={valve.id}
            valve={valve}
            active={self.state.activeValveId === valve.id}
            makeActive={self.makeValveActive}
          />
        );
      });
    }

    while (valves.length < 9) {
      valves.push(<Valve key={valves.length + 1} empty="true" />);
    }

    return (
      <div className="manifoldContainer">
        {valves}
      </div>
    );
  }
}

export default Manifold;
