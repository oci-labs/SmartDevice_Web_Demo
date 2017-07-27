import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainView.css";

import ValveIcon from "../common/ValveIcon";
import Tabs from "../mainView/Tabs";
import { Row } from "../layout/LayoutComponents";

import { setCurrentItem, setCurrentManifold } from "../../actions";

class MainViewComponent extends Component {
  componentWillMount() {
    this.props.handleSetCurrentItem();
  }
  render() {
    const self = this;
    let activeItems;
    if (this.props.activeItems) {
      activeItems = this.props.activeItems.map(function(item) {
        const handleClick = () => {
          self.props.handleSetCurrentItem(item, item.type === "manifold");
        };
        return (
          <ValveIcon key={item.id} size="large" handleClick={handleClick}>
            {item.name}
          </ValveIcon>
        );
      });
    }
    return (
      <div className="mainView">
        <Tabs />
        <Row>
          {activeItems}
        </Row>
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
    handleSetCurrentItem: function(item, isManifold) {
      dispatch(setCurrentItem(item, isManifold));
    },
    handleSetCurrentManifold: function(item) {
      dispatch(setCurrentManifold(item));
    }
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default MainView;
