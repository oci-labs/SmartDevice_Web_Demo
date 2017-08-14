import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainView.css";

import Tabs from "../mainView/Tabs";
import IconGroup from "../mainView/IconGroup";
import { Col, Row } from "reactstrap";
import MachineView from "./MachineView";
import Drilldown from "./Drilldown";


import { setSelectedItem } from "../../actions";

class MainViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItems: props.activeItems,
      facilities: props.facilities,
      selectedDepartment: props.selectedDepartment,
      selectedFacility: props.selectedFacility,
      selectedMachine: props.selectedMachine,
      viewState: props.viewState
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
      selectedMachine: props.selectedMachine,
      viewState: props.viewState
    });
  }
  render() {
    let activeItemsElements;
    if (this.state.activeItems.length) {
      activeItemsElements = this.state.activeItems.map(item =>
        <IconGroup groupItem={item} key={item.id} />
      );
    }
    let viewState = this.state.viewState;
    return (
      <div className="mainView">
        <Tabs
          facilities={this.state.facilities}
          selectedDepartment={this.state.selectedDepartment}
          selectedFacility={this.state.selectedFacility}
          selectedMachine={this.state.selectedMachine}
        />

        {(function() {
          switch(viewState) {
            case 'state:department':
            case 'state:manifold':
            case 'state:station':
              return (
                <Row>
                  <Col className="hidden-sm-down" md="5" lg="7" xl="8">
                    {activeItemsElements}
                  </Col>
                  <MachineView />
                  <Drilldown />
                </Row>
              );
            case 'state:facility':
            case 'state:machine':
            case 'default':
              return (
                <Row>
                  <Col xs="12">
                    {activeItemsElements}
                  </Col>
                  <MachineView />
                  <Drilldown />
                </Row>
              );
          }
        })()}
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
    selectedMachine: state.selectedMachine,
    viewState: state.VIEW_STATE
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