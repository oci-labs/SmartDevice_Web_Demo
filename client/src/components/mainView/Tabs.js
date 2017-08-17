import React, { Component } from "react";
import { connect } from "react-redux";
import "./Tabs.css";

import Tab from "./Tab";
import View from "../common/View";
import Dropdown from "../common/Dropdown";
import {
  DEPARTMENT_STATE,
  FACILITY_STATE,
  MACHINE_STATE,
  MANIFOLD_STATE
} from "../common/view.config";

import { initialize, setSelectedItem } from "../../actions";

class TabsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facilities: props.facilities,
      selectedDepartment: props.selectedDepartment,
      selectedFacility: props.selectedFacility,
      selectedMachine: props.selectedMachine
    };
  }
  componentWillMount() {
    this.props.initializeFacilities();
  }

  componentWillReceiveProps(props) {
    this.setState({
      facilities: props.facilities,
      selectedDepartment: props.selectedDepartment,
      selectedFacility: props.selectedFacility,
      selectedMachine: props.selectedMachine
    });
  }

  render() {
    const {
      facilities,
      selectedDepartment,
      selectedFacility,
      selectedMachine
    } = this.state;
    const addTabs = items => {
      let firstTab = [
        <Tab
          item={{ name: "All", type: "facility" }}
          key="0"
          active={!selectedFacility.id}
        />
      ];

      let additionalTabs = [];

      if (items && items.length) {
        additionalTabs = items.map((item, index) =>
          <Tab
            item={item}
            key={index + 1}
            active={selectedFacility.id === item.id}
          />
        );
      }
      return [...firstTab, ...additionalTabs];
    };
    const handleMachineClick = item => {
      this.props.handleItemClick(item);
    };
    const handleAllMachineClick = () => {
      this.props.handleItemClick({
        type: "machine",
        parent: selectedDepartment
      });
    };
    return (
      <div>
        <View states={[FACILITY_STATE, DEPARTMENT_STATE]} className="tabs">
          <Tab item={{ name: "Facilities" }} label={true} />
          {addTabs(facilities)}
        </View>
        <View states={[MACHINE_STATE, MANIFOLD_STATE]} className="tabs">
          <Tab item={selectedFacility} label={true} selected={true} />
          <Tab item={selectedDepartment} selected={true} />
          <Dropdown
            items={selectedDepartment.children}
            model={selectedMachine}
            handleItemClick={handleMachineClick}
            handleAllClick={handleAllMachineClick}
          />
        </View>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeFacilities: function() {
      dispatch(initialize());
    },
    handleItemClick: item => {
      dispatch(setSelectedItem(item));
    }
  };
};

const Tabs = connect(null, mapDispatchToProps)(TabsComponent);

export default Tabs;
