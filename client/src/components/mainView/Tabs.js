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
  componentWillMount() {
    this.props.initializeFacilities();
  }

  render() {
    const { facilities, selectedFacility, selectedDepartment } = this.props;

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
        parent: this.props.selectedDepartment
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
          <Tab item={this.props.selectedDepartment} selected={true} />
          <Tab item={{ name: "Machine" }} selected={true} />
          <Dropdown
            items={this.props.selectedDepartment.children}
            initialItem={this.props.selectedMachine}
            handleItemClick={handleMachineClick}
            handleAllClick={handleAllMachineClick}
          />
        </View>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeItems: state.activeItems,
    facilities: state.allFacilities,
    selectedDepartment: state.selectedDepartment,
    selectedFacility: state.selectedFacility,
    selectedMachine: state.selectedMachine
  };
};

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

const Tabs = connect(mapStateToProps, mapDispatchToProps)(TabsComponent);

export default Tabs;
