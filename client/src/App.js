import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import {toggleProfile, toggleAlerts } from './actions';
import "whatwg-fetch";

import Alerts from "./components/alerts/Alerts";

import MainView from "./components/layout/MainView";
import Nav from "./components/layout/Nav";
import Profile from "./components/layout/Profile";

import { Container, Row, Col } from "reactstrap";

class App extends Component {
  render() {
    const { viewProfile, viewAlerts, handleToggleProfile, handleToggleAlerts } = this.props;
      return (
        <Container fluid className="full">
      { viewProfile ?
        <Row noGutters>
          <Col className="col-11 col-md-3 col-lg-2 no-gutters">
            <Profile />
          </Col>
          <Col className="col-1 col-md-9 col-lg-10 no-gutters">
            <Row noGutters>
              <Col xs="12"><Nav toggleProfile={handleToggleProfile} toggleAlerts={handleToggleAlerts} /></Col>
            </Row>

              {(() => {
                if (viewAlerts) {
                  return (
                    <Row noGutters>
                      <Col className="hidden-sm-down" md="8" lg="9" xl="10">
                          <MainView className="addScroll" />
                      </Col>
                      <Col sm="5" md="4" lg="3" xl="2" className="leftZero hidden-sm-down">
                        <Alerts />
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row noGutters>
                      <Col md="12" className="hidden-sm-down">
                          <MainView className="addScroll" />
                      </Col>
                      <Col className="hidden-xs-up">
                        <Alerts />
                      </Col>
                    </Row>
                  );
                }
              })()}
          </Col>
        </Row>:
        <Row noGutters>
          <Col className="hidden-xl-down no-gutters">
            <Profile />
          </Col>
          <Col className="col-12 col-sm-12 no-gutters">
            <Row noGutters>
              <Col xs="12"><Nav toggleProfile={handleToggleProfile} toggleAlerts={handleToggleAlerts} /></Col>
            </Row>
            {(() => {
              if (viewAlerts) {
                return (
                  <Row noGutters>
                    <Col className="hidden-xs-down" sm="7" md="8" lg="9" xl="10">

                        <MainView className="addScroll" />
                        {/*<MachineView />*/}
                        {/*<Drilldown />*/}

                    </Col>
                    <Col xs="12" sm="5" md="4" lg="3" xl="2">
                      <Alerts />
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row noGutters>
                    <Col xs="12">
                      <MainView className="addScroll" />
                      {/*<MachineView />*/}
                      {/*<Drilldown />*/}
                    </Col>
                    <Col className="hidden-xs-up">
                      <Alerts />
                    </Col>
                  </Row>
                );
              }
            })()}
          </Col>
        </Row>
      }
      </Container>
      )
  }
}

function mapStateToProps(state) {
  return {
    viewProfile: state.viewProfile,
    viewAlerts: state.viewAlerts
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleToggleProfile: function() {
      dispatch(toggleProfile());
    },
    handleToggleAlerts: function() {
      dispatch(toggleAlerts());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
