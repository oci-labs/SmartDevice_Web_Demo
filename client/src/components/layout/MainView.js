import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainView.css";

import Tabs from "../mainView/Tabs";
import IconGroup from "../mainView/IconGroup";
import { Column } from "../layout/LayoutComponents";

import { setSelectedItem } from "../../actions";

class MainViewComponent extends Component {
  componentWillMount() {
    this.props.handleSetCurrentItem();
  }
  render() {
    let activeItems;
    if (this.props.activeItems) {
      activeItems = this.props.activeItems.map(function(item, index) {
        return <IconGroup groupItem={item} key={item.id} />;
      });
    }
    return (
      <div className="mainView">
        <Tabs />
        <Column>
          {activeItems}
        </Column>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeItems: state.activeItems
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
