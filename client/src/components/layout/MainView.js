import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainView.css";

import Item from "../mainView/Item";

import { getAllFacilities } from "../../actions";

class MainViewComponent extends Component {
  componentWillMount() {
    this.props.loadAllFacilities();
  }
  render() {
    let machines;
    if (this.props.facilities) {
      machines = this.props.facilities.map(function(machine) {
        return (
          <Item key={machine.id}>
            {machine.name}
          </Item>
        );
      });
    }
    return (
      <div className="mainView">
        {machines}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    facilities: state.facilities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllFacilities: function() {
      dispatch(getAllFacilities());
    }
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default MainView;
