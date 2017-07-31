import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Drilldown.css";

import ValveIcon from "../common/ValveIcon";
import Manifold from "../drilldown/Manifold";
import CycleCount from "../drilldown/CycleCount";
import Icon from "../icons/Icon";
import { Column, Row, HorizontalLine, VerticalLine } from "./LayoutComponents";
import View from "../common/View";
import { MANIFOLD_STATE } from "../common/view.config";

const DrilldownComponent = ({ selectedManifold, currentStation }) => {
  let error, title, station;

  if (selectedManifold) {
    title = (
      <div className="drilldownTitle">
        {selectedManifold.name}
      </div>
    );
  }

  if (currentStation) {
    station = (
      <div>
        <Row className="drilldownInfo">
          <Icon type="settings_input_composite" className="image" />
          <Column>
            <div className="nameInfo">
              {currentStation.name}
            </div>
            <div>
              {currentStation.model}
            </div>
            <div>
              {currentStation.serialNum}
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

  if (currentStation && currentStation.error) {
    error = (
      <Row className="drilldownError">
        Pressure Warning: 6/6 - 12:15 PM<Icon type="close" />
      </Row>
    );
  }

  return (
    <View states={MANIFOLD_STATE}>
      <div className={`drilldown ${selectedManifold ? "show" : "hide"}`}>
        {title}
        <Manifold manifold={selectedManifold} />
        {error}
        {station}
      </div>
    </View>
  );
};

DrilldownComponent.propTypes = {
  selectedManifold: PropTypes.object,
  currentStation: PropTypes.object
};

const mapStateToProps = state => {
  return {
    selectedManifold: state.selectedManifold,
    currentStation: state.currentStation
  };
};

const Drilldown = connect(mapStateToProps)(DrilldownComponent);

export default Drilldown;
