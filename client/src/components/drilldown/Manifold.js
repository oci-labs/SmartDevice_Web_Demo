import React from "react";
import Station from "./Station";
import "./Manifold.css";
import { authRequest } from "../../services/authRequestService"

class Manifold extends React.Component {
  constructor() {
    super();

    this.state = {
      statuses: []
    };
  }

  componentDidMount() {
    this.getValveStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getValveStatus = () => {
    let _self = this;
    this.timeout = setTimeout(this.getValveStatus, 5000);
    const { manifold } = this.props;
    authRequest(`/api/valveStatus/manifold/${manifold.serialNumber}`, 'get', result => {
      _self.setState({statuses: result});
    });
  };

  render() {
    const { currentStation, handleStationClick, manifold } = this.props;
    const { statuses } = this.state;

    let stations = [];
    if (manifold && manifold.children && !statuses.error) {
      stations = manifold.children
        .sort((a, b) => a.id - b.id)
        .map((station, index) => {
          const status = statuses.find(s => s.valve.station.id === station.id);
          const inFault = status
            ? status.cycleCount > status.cycleCountLimit ||
              status.leak !== "N" ||
              status.pressureFault !== "N"
            : false;

          return (
            <Station
              id={++index}
              key={station.id}
              station={station}
              currentStation={currentStation}
              empty={!status}
              status={status}
              inFault={inFault}
              manifoldId={manifold.id}
              onClick={handleStationClick}
            />
          );
        });
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
  }
}

export default Manifold;
