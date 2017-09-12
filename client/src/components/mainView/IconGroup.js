import React, { Component } from "react";
import { connect } from "react-redux";
import "./IconGroup.css";
import { listen } from "../../services/InFaultService";
import ValveIcon from "../common/ValveIcon";
import AddItem from "../items/AddItem";
import EditItem from "../items/EditItem";
import Icon from "../icons/Icon";
import { HorizontalLine } from "../layout/LayoutComponents";
import { setSelectedItem } from "../../actions";
import { Col, Row } from "reactstrap";

class IconGroupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warnings: {}
    };
  }

  setWarnings = item => {
    item.children.map(child => {
      const id = child.id ? child.id : child.serialNumber;
      const listener = listen(`${child.type}.${id}`, true, value => {
        if (this.state.warnings[id] !== value) {
          const newWarning = {};
          newWarning[id] = value;
          this.setState({
            warnings: Object.assign({}, this.state.warnings, newWarning)
          });
        }
      });
      return listener;
    });
  };

  componentWillMount() {
    this.setWarnings(this.props.groupItem);
  }

  componentWillReceiveProps(nextProps) {
    this.setWarnings(nextProps.groupItem);
  }

  render() {
    const { groupItem, handleIconClick } = this.props;
    let groupItemChildren = {};
    if (groupItem && groupItem.children) {
      groupItemChildren = groupItem.children
        .slice()
        .sort((a, b) => {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        })
        .map((child, index) => {
          const handleClick = () => {
            handleIconClick(child);
          };
          const id = child.id ? child.id : child.serialNumber;
          return (
            <Col key={index} xs="12" sm="6" md="4" lg="3">
              <ValveIcon
                size="large"
                handleClick={handleClick}
                warning={this.state.warnings[id]}
              >
                {child.name}
              </ValveIcon>
            </Col>
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
          <div className="groupItemNavCenter">
            {groupItem ? groupItem.name : "All"}
          </div>
          <div className="groupItemNavRight">
            <EditItem item={groupItem}>
              <Icon type="mode_edit" />
            </EditItem>
            <Icon type="fullscreen" />
          </div>
        </div>
        <HorizontalLine />
        <Row noGutters className="justify-content-center">
          {groupItemChildren}
        </Row>
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
    handleIconClick: function(item) {
      dispatch(setSelectedItem(item));
    }
  };
};

const IconGroup = connect(mapStateToProps, mapDispatchToProps)(
  IconGroupComponent
);

export default IconGroup;
