import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "../icons/Icon";
import { setCurrentValve } from "../../actions";
import "./Valve.css";

const ValveComponent = ({
  handleValveClick,
  id,
  valve,
  empty,
  currentValve
}) => {
  if (empty) {
    return (
      <div className="valveWrapper">
        <div className="valveEmptyContainer">
          <Icon type="add" />
        </div>
      </div>
    );
  }
  const onValveClick = () => {
    handleValveClick(valve);
  };
  return (
    <div
      className={`valveWrapper ${currentValve.id === valve.id ? "active" : ""}`}
    >
      <div className="valveContainer" onClick={onValveClick}>
        <div className="valveIndicator" />
        <div
          className={`${currentValve.id === valve.id
            ? "valveActiveIndicator"
            : ""}`}
        >
          <div className="valveLabel">
            {id}
          </div>
        </div>
      </div>
    </div>
  );
};

ValveComponent.propTypes = {
  dispatch: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.number,
  valve: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentValve: state.currentValve
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleValveClick: valve => {
      dispatch(setCurrentValve(valve));
    }
  };
};

const Valve = connect(mapStateToProps, mapDispatchToProps)(ValveComponent);

export default Valve;
