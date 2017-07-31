import React from "react";
import { connect } from "react-redux";
import "./IconGroup.css";
import ValveIcon from "../common/ValveIcon";
import Icon from "../icons/Icon";
import { HorizontalLine, Row } from "../layout/LayoutComponents";
import { setSelectedItem } from "../../actions";

const IconGroupComponent = ({ activeItems, groupItem, handleIconClick }) => {
  let groupItemChildren = {};
  if (groupItem && groupItem.children) {
    groupItemChildren = groupItem.children.map(function(child, index) {
      const handleClick = () => {
        handleIconClick(child);
      };
      return (
        <ValveIcon key={index} size="large" handleClick={handleClick}>
          {child.name}
        </ValveIcon>
      );
    });
  }
  return (
    <div className="groupItemContainer">
      <div className="groupItemNav">
        <div className="groupItemNavLeft">
          <div className="addNew">
            <Icon type="add" />
          </div>
        </div>
        {groupItem ? groupItem.name : "All"}
        <div className="groupItemNavRight">
          <Icon type="mode_edit" />
          <Icon type="fullscreen" />
        </div>
      </div>
      <HorizontalLine />
      <Row>
        {groupItemChildren}
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeItems: state.activeItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIconClick: function(item) {
      dispatch(setSelectedItem(item));
    }
  };
};

const IconGroup = connect(mapStateToProps, mapDispatchToProps)(
  IconGroupComponent
);

export default IconGroup;
