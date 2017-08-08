import React, { Component } from "react";
import "./App.css";

import "whatwg-fetch";

import AlertBar from "./components/layout/AlertBar";
import Drilldown from "./components/layout/Drilldown";
import MachineView from "./components/layout/MachineView";
import MainView from "./components/layout/MainView";
import Nav from "./components/layout/Nav";
import Profile from "./components/layout/Profile";
import { Row, Column } from "./components/layout/LayoutComponents";

class App extends Component {
  render() {
    return (
      <Row>
        <Profile />
        <Column className="fillScreen">
          <Nav />
          <Row>
            <MainView className="addScroll" />
            <MachineView />
            <Drilldown />
            <AlertBar />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default App;
