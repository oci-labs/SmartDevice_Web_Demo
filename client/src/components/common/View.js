import React from "react";
import { connect } from "react-redux";

const ViewComponent = ({ children, className, currentState, states }) => {
  let show = false;
  if (Array.isArray(states)) {
    show = states.some(function(state) {
      return state === currentState;
    });
  } else {
    show = states === currentState;
  }
  if (show) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    currentState: state.VIEW_STATE
  };
};

const View = connect(mapStateToProps)(ViewComponent);

export default View;
