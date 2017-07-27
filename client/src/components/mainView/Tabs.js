import React, { Component } from "react";
import { connect } from "react-redux";
import "./Tabs.css";

import Dropdown from "../common/Dropdown";

import { setCurrentItem } from "../../actions";

class TabsComponent extends Component {
  componentWillMount() {
    this.props.initializeFacilities();
  }
  render() {
    return (
      <div className="tabs">
        <Dropdown items={this.props.activeItems} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeItems: state.activeItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeFacilities: function() {
      dispatch(setCurrentItem());
    }
  };
};

const Tabs = connect(mapStateToProps, mapDispatchToProps)(TabsComponent);

export default Tabs;
