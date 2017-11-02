import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MainView.css';

import Tabs from '../mainView/Tabs';
import View from '../common/View';
import IconGroup from '../mainView/IconGroup';
import {Col, Row} from 'reactstrap';
import Admin from './Admin';
import MachineView from './MachineView';
import Drilldown from './Drilldown';

import {
  ADMIN_STATE,
  DEPARTMENT_STATE,
  FACILITY_STATE,
  MACHINE_STATE,
  MANIFOLD_STATE
} from '../common/view.config';

import {setSelectedItem} from '../../actions';

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
    const {viewProfile, viewAlerts, currentUser} = this.props;
    let activeItemsElements;
    if (this.state.activeItems.length) {
      activeItemsElements = this.state.activeItems.map(item => (
        <IconGroup groupItem={item} key={item.id} />
      ));
    }
    const viewState = this.state.viewState;
    return (
      <div className="mainView">
        <View states={[ADMIN_STATE]}>
          <Admin />
        </View>
        <View
          states={[
            DEPARTMENT_STATE,
            FACILITY_STATE,
            MACHINE_STATE,
            MANIFOLD_STATE
          ]}
        >
          <Tabs
            facilities={this.state.facilities}
            selectedDepartment={this.state.selectedDepartment}
            selectedFacility={this.state.selectedFacility}
            selectedMachine={this.state.selectedMachine}
          />
          {currentUser ? (
            (() => {
              switch (viewState) {
                case 'state:department':
                case 'state:manifold':
                case 'state:station':
                  if (viewProfile && viewAlerts) {
                    return (
                      <Row className="mainContent no-gutters">
                        <Col className="hidden-lg-down" xl="7">
                          {activeItemsElements}
                        </Col>
                        <MachineView />
                        <Drilldown />
                      </Row>
                    );
                  }
                  if (viewProfile || viewAlerts) {
                    return (
                      <Row className="mainContent no-gutters">
                        <Col className="hidden-md-down" lg="6" xl="7">
                          {activeItemsElements}
                        </Col>
                        <MachineView />
                        <Drilldown />
                      </Row>
                    );
                  }
                  return (
                    <Row className="mainContent no-gutters">
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
                    <Row className="mainContent no-gutters">
                      <Col xs="12">{activeItemsElements}</Col>
                      <MachineView />
                      <Drilldown />
                    </Row>
                  );
                default:
                  return null;
              }
            })()
          ) : (
            <p>
              Please Login: <br />
              <b>Demo Credentials</b>
              <br />
              <b>Username:</b> demoDan<br />
              <b>Password:</b> password
            </p>
          )}
        </View>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeItems: state.activeItems,
    facilities: state.facilities,
    selectedDepartment: state.selectedContext.department,
    selectedFacility: state.selectedContext.facility,
    selectedMachine: state.selectedContext.machine,
    viewState: state.view.VIEW_STATE,
    viewProfile: state.view.viewProfile,
    viewAlerts: state.view.viewAlerts,
    currentUser: state.currentUser.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSetCurrentItem(item) {
      dispatch(setSelectedItem(item));
    }
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default MainView;
