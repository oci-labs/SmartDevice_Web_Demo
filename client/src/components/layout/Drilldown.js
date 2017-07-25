import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Drilldown.css";

import ValveIcon from "../drilldown/ValveIcon";
import Manifold from "../drilldown/Manifold";
import CycleCount from "../drilldown/CycleCount";
import Icon from "../icons/Icon";
import { Column, Row, HorizontalLine, VerticalLine } from "./LayoutComponents";

const DrilldownComponent = ({ currentManifold, currentValve }) => {
  let error, valve;

  if (currentValve) {
    valve = (
      <div>
        <Row className="drilldownInfo">
          <Icon type="settings_input_composite" className="image" />
          <Column>
            <div className="nameInfo">
              {currentValve.name}
            </div>
            <div>
              {currentValve.model}
            </div>
            <div>
              {currentValve.serialNum}
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
        <CycleCount cycleCount="1000" />
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

  if (currentValve && currentValve.error) {
    error = (
      <Row className="drilldownError">
        Pressure Warning: 6/6 - 12:15 PM<Icon type="close" />
      </Row>
    );
  }

  return (
    <div className="drilldown">
      <div className="drilldownTitle">
        {currentManifold.name}
      </div>
      <Manifold manifold={currentManifold} />
      {error}
      {valve}
    </div>
  );
};

DrilldownComponent.propTypes = {
  currentValve: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentManifold: state.currentManifold,
    currentValve: state.currentValve
  };
};

const Drilldown = connect(mapStateToProps)(DrilldownComponent);

export default Drilldown;
