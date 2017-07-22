import React, { Component } from "react";

import { SERVER_URL } from "./config";
import "whatwg-fetch";

import AlertBar from "./components/layout/AlertBar";
import Drilldown from "./components/layout/Drilldown";
import MainView from "./components/layout/MainView";
import Nav from "./components/layout/Nav";
import Profile from "./components/layout/Profile";
import { Row, Column } from "./components/layout/LayoutComponents";

class App extends Component {
  componentDidMount() {
    fetch(SERVER_URL + "/application")
      .then(r => r.json())
      .then(json => this.setState({ serverInfo: json }))
      .catch(error => console.error("Error connecting to server: " + error));
  }

  render() {
    return (
      <Row>
        <Profile />
        <Column>
          <Nav />
          <Row>
            <MainView />
            <Drilldown />
            <AlertBar />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default App;
