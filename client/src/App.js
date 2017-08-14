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
          <Col className="col-11 col-md-3 col-lg-2 no-gutters">
            <Profile />
          </Col>
          <Col className="col-1 col-md-9 col-lg-10 no-gutters">
            <Row noGutters>
              <Col xs="12"><Nav toggleProfile={this.toggleProfile} toggleAlerts={this.toggleAlerts} /></Col>
            </Row>

              {(() => {
                if (viewAlerts) {
                  return (
                    <Row noGutters>
                      <Col className="hidden-sm-down" md="8" lg="9" xl="10">

                          <MainView className="addScroll" />
                          {/*<MachineView />*/}


                      </Col>
                      <Col sm="5" md="4" lg="3" xl="2" className="leftZero hidden-xs-down">
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
                      <Col className="hidden-sm-down">
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
              <Col xs="12"><Nav toggleProfile={this.toggleProfile} toggleAlerts={this.toggleAlerts} /></Col>
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
