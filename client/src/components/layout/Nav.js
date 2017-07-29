import React, { Component } from "react";
import { connect } from "react-redux";
import "./Nav.css";

import { Row } from "../layout/LayoutComponents";

class NavComponent extends Component {
  render() {
    return (
      <div className="nav">
        <Row>
          <div>
            Selected Facility:{" "}
            {this.props.selectedFacility
              ? this.props.selectedFacility.name
              : "None"}
          </div>
          <div>
            Selected Department:{" "}
            {this.props.selectedDepartment
              ? this.props.selectedDepartment.name
              : "None"}
          </div>
          <div>
            Selected Machine:{" "}
            {this.props.selectedMachine
              ? this.props.selectedMachine.name
              : "None"}
          </div>
          <div>
            Selected Manifold:{" "}
            {this.props.selectedManifold
              ? this.props.selectedManifold.name
              : "None"}
          </div>
          <div>
            VIEW_STATE: {this.props.VIEW_STATE ? this.props.VIEW_STATE : "None"}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedFacility: state.selectedFacility,
    selectedDepartment: state.selectedDepartment,
    selectedMachine: state.selectedMachine,
    selectedManifold: state.selectedManifold,
    VIEW_STATE: state.VIEW_STATE
  };
};

const Nav = connect(mapStateToProps)(NavComponent);

export default Nav;
