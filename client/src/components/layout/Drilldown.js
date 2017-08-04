import React, { Component } from "react";
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

import { setValveStatus } from "../../actions";

class DrilldownComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValve: props.selectedValve,
      valveStatus: props.valveStatus
    };
    this.setStatusCheck();
  }
  setStatusCheck = () => {
    this.props.setValveStatus(this.props.selectedValve);
    this.timeout = setTimeout(() => {
      this.setStatusCheck();
    }, 5000);
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedValve: nextProps.selectedValve,
      valveStatus: nextProps.valveStatus
    });
    if (nextProps.selectedValve !== this.state.selectedValve) {
      nextProps.setValveStatus(nextProps.selectedValve);
    }
  }
  render() {
    const { selectedManifold, currentStation } = this.props;
    const { selectedValve, valveStatus } = this.state;
    const currentValveStatus = valveStatus[0] ? valveStatus[0] : {};
    let error, title, station;

    if (selectedManifold) {
      title = (
        <div className="drilldownTitle">
          {selectedManifold.name}
        </div>
      );
    }

    if (currentStation && selectedValve && !selectedValve.error) {
      station = (
        <div>
          <Row className="drilldownInfo">
            <Icon type="settings_input_composite" className="image" />
            <Column>
              <div className="nameInfo">
                {currentStation.name}
              </div>
              <div>
                {selectedValve.sku}
              </div>
              <div>
                {selectedValve.serialNumber}
              </div>
            </Column>
          </Row>
          <HorizontalLine />
          <Row className="faults">
            <ValveIcon>Valve Fault</ValveIcon>
            <ValveIcon warning={currentValveStatus.leak === "Y"}>
              Leak Fault
            </ValveIcon>
            <ValveIcon warning={currentValveStatus.pressureFault === "Y"}>
              Pressure Fault
            </ValveIcon>
          </Row>
          <HorizontalLine />
          <CycleCount cycleCount={currentValveStatus.cycleCount} />
          <HorizontalLine />
          <Row className="drilldownData">
            <Column className="drilldownDataColumn">
              <div className="dataLabel">Supply Pressure:</div>
              <div className="data">
                {currentValveStatus.pressurePoint} psi
              </div>
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
    } else {
      station = <div>There is no valve connected to this station</div>;
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
  }
}

DrilldownComponent.propTypes = {
  selectedManifold: PropTypes.object,
  currentStation: PropTypes.object
};

const mapStateToProps = state => {
  return {
    selectedManifold: state.selectedManifold,
    currentStation: state.currentStation,
    selectedValve: state.selectedValve,
    valveStatus: state.valveStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setValveStatus: function(valve) {
      dispatch(setValveStatus(valve));
    }
  };
};

const Drilldown = connect(mapStateToProps, mapDispatchToProps)(
  DrilldownComponent
);

export default Drilldown;
