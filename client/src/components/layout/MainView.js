import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainView.css";

import { getAllMachines } from "../../actions";

class MainViewComponent extends Component {
  componentWillMount() {
    this.props.loadAllMachines();
  }
  render() {
    let machines;
    if (this.props.machines) {
      machines = this.props.machines.map(function(machine) {
        return (
          <div key={machine.id}>
            {machine.name}
          </div>
        );
      });
    }
    return (
      <div className="mainView">
        MainView
        {machines}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    machines: state.machines
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllMachines: function() {
      dispatch(getAllMachines());
    }
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default MainView;
