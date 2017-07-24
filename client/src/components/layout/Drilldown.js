import React, { Component } from "react";
import "./Drilldown.css";

import ValveIcon from "../drilldown/ValveIcon";
import Manifold from "../drilldown/Manifold";
import Icon from "../icons/Icon";
import { Column, Row, HorizontalLine, VerticalLine } from "./LayoutComponents";

class Drilldown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValve: {
        name: "Station: 2",
        model: "100105",
        serialNum: "12NX-DCV-SM-BLU-1-1-VO-L1-SO-OO"
      }
    };
  }
  render() {
    let error, valve;
    let manifold = {
      id: 3,
      name: "Manifold 3",
      stations: [
        { id: 1, name: "Station 1" },
        { id: 2, name: "Station 2" },
        { id: 3, name: "Station 3" },
        { id: 4, name: "Station 4" },
        { id: 5, name: "Station 5" }
      ]
    };

    if (this.state.currentValve) {
      valve = (
        <div>
          <Row className="drilldownInfo">
            <Icon type="settings_input_composite" className="image" />
            <Column>
              <div className="nameInfo">
                {this.state.currentValve.name}
              </div>
              <div>
                {this.state.currentValve.model}
              </div>
              <div>
                {this.state.currentValve.serialNum}
              </div>
            </Column>
          </Row>
          <HorizontalLine />
          <Row className="faults">
            <ValveIcon>Valve Fault</ValveIcon>
            <ValveIcon>Leak Fault</ValveIcon>
            <ValveIcon>Pressure Fault</ValveIcon>
          </Row>
          <HorizontalLine />
          <Row className="drilldownData">
            <Column className="drilldownDataColumn">
              <div className="dataLabel">Supply Pressure:</div>
              <div className="data">100 psi</div>
              <div className="dataLabel">Duration Last 1-20:</div>
              <div className="data">22ms</div>
            </Column>
            <VerticalLine />
            <Column className="drilldownDataColumn">
              <div className="dataLabel">Duration Last 1-4:</div>
              <div className="data">45ms</div>
              <div className="dataLabel">Equalization Avg Pressure:</div>
              <div className="data">83psi</div>
            </Column>
          </Row>
        </div>
      );
    }

    if (this.state.currentValve.error) {
      error = (
        <Row className="drilldownError">
          Pressure Warning: 6/6 - 12:15 PM<Icon type="close" />
        </Row>
      );
    }

    return (
      <div className="drilldown">
        <div className="drilldownTitle">
          {manifold.name}
        </div>
        <Manifold manifold={manifold} />
        {error}
        {valve}
      </div>
    );
  }
}

export default Drilldown;
