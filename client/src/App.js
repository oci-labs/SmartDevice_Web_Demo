import React, { Component } from "react";
import "./App.css";

import "whatwg-fetch";

import Alerts from "./components/alerts/Alerts";
import Drilldown from "./components/layout/Drilldown";
import MachineView from "./components/layout/MachineView";
import MainView from "./components/layout/MainView";
import Nav from "./components/layout/Nav";
import Profile from "./components/layout/Profile";
//import { Row, Column } from "./components/layout/LayoutComponents";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewProfile: true,
      viewAlerts: false,
    };
  }
  toggleProfile = () => {
    this.setState({viewProfile: !this.state.viewProfile});
  }
  toggleAlerts = () => {
      this.setState({viewAlerts: !this.state.viewAlerts});
  }
  render() {
    let viewProfile = this.state.viewProfile;
    let viewAlerts = this.state.viewAlerts;
    let collapseState = `${viewProfile}-${viewAlerts}`;
      return (
        <Container fluid className="full">
      { viewProfile ?
        <Row noGutters>
          <Col className="col-10 col-sm-3 col-md-2 no-gutters">
            <Profile />
          </Col>
          <Col className="col-1 col-sm-9 col-md-10 no-gutters">
            <Row noGutters>
              <Col xs="12"><Nav toggleProfile={this.toggleProfile} toggleAlerts={this.toggleAlerts} /></Col>
            </Row>

              {(() => {
                if (viewAlerts) {
                  return (
                    <Row noGutters>
                      <Col xs="12" sm="7" md="8" lg="9" xl="10">
                        <MainView className="addScroll" />
                        <MachineView />
                        <Drilldown />
                      </Col>
                      <Col xs="0" sm="5" md="4" lg="3" xl="2" className="leftZero">
                        <Alerts />
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row noGutters>
                      <Col xs="12">
                        <MainView className="addScroll" />
                        <MachineView />
                        <Drilldown />
                      </Col>
                      <Col xs="0">
                        <Alerts />
                      </Col>
                    </Row>
                  );
                }
              })()}
          </Col>
        </Row>:
        <Row noGutters>
          <Col className="col-0 col-sm-0 no-gutters">
            <Profile />
          </Col>
          <Col className="col-12s col-sm-12 no-gutters">
            <Row noGutters>
              <Col xs="12"><Nav toggleProfile={this.toggleProfile} toggleAlerts={this.toggleAlerts} /></Col>
            </Row>
            {(() => {
              if (viewAlerts) {
                return (
                  <Row noGutters>
                    <Col xs="2" sm="7" md="8" lg="9" xl="10">
                      <MainView className="addScroll" />
                      <MachineView />
                      <Drilldown />
                    </Col>
                    <Col xs="10" sm="5" md="4" lg="3" xl="2">
                      <Alerts />
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row noGutters>
                    <Col xs="12">
                      <MainView className="addScroll" />
                      <MachineView />
                      <Drilldown />
                    </Col>
                    <Col xs="0">
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


  // render() {
  //   return (
  //     <Row noGutters>
  //       <Profile />
  //       <Column className="fillScreen">
  //         <Nav />
  //         <Row noGutters>
  //           <MainView className="addScroll" />
  //           <MachineView />
  //           <Drilldown />
  //           <AlertBar />
  //         </Row>
  //       </Column>
  //     </Row>
  //   );
  // }
}

export default App;
