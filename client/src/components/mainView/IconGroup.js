import React from "react";
import { connect } from "react-redux";
import "./IconGroup.css";
import ValveIcon from "../common/ValveIcon";
import AddItem from "../items/AddItem";
import EditItem from "../items/EditItem";
import Icon from "../icons/Icon";
import { HorizontalLine, Row } from "../layout/LayoutComponents";
import { setSelectedItem } from "../../actions";

const IconGroupComponent = ({ activeItems, groupItem, handleIconClick }) => {
  let groupItemChildren = {};
  if (groupItem && groupItem.children) {
    groupItemChildren = groupItem.children
      .slice()
      .sort((a, b) => {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      })
      .map(function(child, index) {
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
            <AddItem>
              <Icon type="add" />
            </AddItem>
          </div>
        </div>
        {groupItem ? groupItem.name : "All"}
        <div className="groupItemNavRight">
          <EditItem item={groupItem}>
            <Icon type="mode_edit" />
          </EditItem>
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
