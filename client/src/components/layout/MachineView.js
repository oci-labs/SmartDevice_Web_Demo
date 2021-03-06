import React from "react";
import { connect } from "react-redux";
import "./MachineView.css";

import { HorizontalLine } from "../layout/LayoutComponents";
import Icon from "../icons/Icon";
import View from "../common/View";
import EditItem from "../items/EditItem";
import { DEPARTMENT_STATE } from "../common/view.config";
import { setSelectedItem } from "../../actions";

const MachineViewComponent = ({ handleMachineClick, selectedDepartment, viewProfile, viewAlerts }) => {
  let machines;

  if (selectedDepartment.children) {
    machines = selectedDepartment.children.map(function(child, index) {
      const machineClick = () => {
        handleMachineClick(child);
      };
      return (
        <div key={index} onClick={machineClick}>
          <div className="departmentChild">
            <div>
              {child.name}
            </div>
            <Icon type="keyboard_arrow_right" />
          </div>
          <HorizontalLine />
        </div>
      );
    });
  }
  return (
    <View states={[DEPARTMENT_STATE]} className={"" + (viewProfile && viewAlerts ? "machineView col-12 col-xl-5" : viewProfile||viewAlerts ? "machineView col-12 col-lg-6 col-xl-5" : "machineView col-12 col-12 col-md-7 col-lg-5 col-xl-4")}>
      <div className="departmentTitle">
        <div>
          {selectedDepartment.name}
        </div>
        <div className="departmentNavRight">
          <EditItem item={selectedDepartment}>
            <Icon type="mode_edit" />
          </EditItem>
          <div>
            <Icon type="fullscreen" />
          </div>
        </div>
      </div>
      <HorizontalLine />
      {machines}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    selectedDepartment: state.selectedDepartment,
    viewProfile:state.viewProfile,
    viewAlerts: state.viewAlerts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMachineClick: function(machine) {
      dispatch(setSelectedItem(machine));
    }
  };
};

const MachineView = connect(mapStateToProps, mapDispatchToProps)(
  MachineViewComponent
);

export default MachineView;
