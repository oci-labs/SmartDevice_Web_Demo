import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainView.css";

import Tabs from "../mainView/Tabs";
import IconGroup from "../mainView/IconGroup";
import { Col, Row } from "reactstrap";
import MachineView from "./MachineView";



import { setSelectedItem } from "../../actions";

class MainViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItems: props.activeItems,
      facilities: props.facilities,
      selectedDepartment: props.selectedDepartment,
      selectedFacility: props.selectedFacility,
      selectedMachine: props.selectedMachine
    };
  }
  componentWillMount() {
    this.props.handleSetCurrentItem();
  }
  componentWillReceiveProps(props) {
    this.setState({
      activeItems: props.activeItems,
      facilities: props.facilities,
      selectedDepartment: props.selectedDepartment,
      selectedFacility: props.selectedFacility,
      selectedMachine: props.selectedMachine
    });
  }
  render() {
    let activeItemsElements;
    if (this.state.activeItems.length) {
      activeItemsElements = this.state.activeItems.map(item =>
        <IconGroup groupItem={item} key={item.id} />
      );
    }
    return (
      <div className="mainView">
        <Tabs
          facilities={this.state.facilities}
          selectedDepartment={this.state.selectedDepartment}
          selectedFacility={this.state.selectedFacility}
          selectedMachine={this.state.selectedMachine}
        />
        <Row noGutters>
          <Col xs="7">
            {activeItemsElements}
          </Col>
          <MachineView />
        </Row>

      </div>


    );
  }
}

function mapStateToProps(state) {
  return {
    activeItems: state.activeItems,
    facilities: state.allFacilities,
    selectedDepartment: state.selectedDepartment,
    selectedFacility: state.selectedFacility,
    selectedMachine: state.selectedMachine
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSetCurrentItem: function(item) {
      dispatch(setSelectedItem(item));
    }
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default MainView;
