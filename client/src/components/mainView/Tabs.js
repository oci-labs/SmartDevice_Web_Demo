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
    const self = this;
    let additionalTabs = [
      <Tab
        item={{ name: "All", type: "facility" }}
        key="0"
        active={!this.props.selectedFacility.id}
      />
    ];
    const addTabs = items => {
      if (items) {
        items.map(function(item, index) {
          additionalTabs.push(
            <Tab
              item={item}
              key={index + 1}
              active={self.props.selectedFacility.id === item.id}
            />
          );
        });
      }
      return additionalTabs;
    };
    const handleMachineClick = item => {
      this.props.handleItemClick(item);
    };
    const handleAllMachineClick = () => {
      this.props.handleItemClick({ type: "machine" });
    };
    return (
      <div>
        <View states={[FACILITY_STATE, DEPARTMENT_STATE]} className="tabs">
          <Tab item={{ name: "Facilities" }} label={true} />
          {addTabs(this.props.facilities)}
        </View>
        <View states={[MACHINE_STATE, MANIFOLD_STATE]} className="tabs">
          <Tab
            item={this.props.selectedFacility}
            label={true}
            selected={true}
          />
          <Tab item={this.props.selectedDepartment} selected={true} />
          <Tab item={{ name: "Machine" }} selected={true} />
          <Dropdown
            items={this.props.selectedDepartment.children}
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
    selectedFacility: state.selectedFacility
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
