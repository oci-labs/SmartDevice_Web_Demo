import React, { Component } from "react";
import Valve from "./Valve";
import "./Manifold.css";

class Manifold extends Component {
  render() {
    return (
      <div className="manifoldContainer">
        <Valve id="1" />
        <Valve id="2" active="true" />
        <Valve id="3" />
        <Valve id="4" />
        <Valve id="5" />
        <Valve empty="true" />
        <Valve empty="true" />
        <Valve empty="true" />
        <Valve empty="true" />
      </div>
    );
  }
}

export default Manifold;
