import React, { Component } from "react";
import "./Drilldown.css";

import ValveIcon from "../drilldown/ValveIcon";
import Manifold from "../drilldown/Manifold";
import { Column, Row, HorizontalLine, VerticalLine } from "./LayoutComponents";

class Drilldown extends Component {
  render() {
    return (
      <div className="drilldown">
        <div className="drilldownTitle">Mainfold 4</div>
        <Manifold />
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
}

export default Drilldown;
