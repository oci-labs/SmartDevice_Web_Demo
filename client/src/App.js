import React, { Component } from "react";

import "whatwg-fetch";

import AlertBar from "./components/layout/AlertBar";
import Drilldown from "./components/layout/Drilldown";
import MainView from "./components/layout/MainView";
import Nav from "./components/layout/Nav";
import Profile from "./components/layout/Profile";
import { Row, Column } from "./components/layout/LayoutComponents";
import WebSocketDemo from "./components/demo/WebsocketDemo";

class App extends Component {

  render() {
    return (
      <Row>
        <Profile />
        <Column>
          <Nav />
          <Row>
            <MainView>
              <WebSocketDemo />h
            </MainView>
            <Drilldown />
            <AlertBar />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default App;
