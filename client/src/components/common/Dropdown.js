import React, { Component } from "react";
import "./Dropdown.css";

import Icon from "../icons/Icon";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: this.props.model,
      show: false
    };
  }

  collapse = () => {
    this.setState({
      show: false
    });
  };

  expandDropdown = () => {
    this.setState({
      show: !this.state.show
    });
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.collapse();
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.items && !this.state.selectedItem) {
      this.setState({
        selectedItem: newProps.items[0]
      });
    }
    if (
      newProps.items &&
      newProps.model &&
      newProps.items.some(item => item.id === newProps.model.id)
    ) {
      console.log("Model name", newProps.model.name);
      this.setState({
        selectedItem: newProps.model
      });
    }
  }

  render() {
    const { selectedItem, show } = this.state;

    let items = null;
    if (this.props.items) {
      items = this.props.items.map((item, index) => {
        const selectItem = () => {
          this.setState({
            selectedItem: item,
            show: false
          });
          this.props.handleItemClick(item);
        };
        return (
          <div key={index + 1} className="dropdownItem" onClick={selectItem}>
            {item.name}
          </div>
        );
      });
      const selectAll = () => {
        this.setState({
          selectedItem: { name: "All" },
          show: false
        });
        this.props.handleAllClick();
      };
      items.unshift(
        <div key="0" className="dropdownItem" onClick={selectAll}>
          All
        </div>
      );
    }
    return (
      <div className="dropdownContainer">
        <div className="selectedDropdownOption">
          <div className="dropdownItem" onClick={this.expandDropdown}>
            <div className="labelWrapper">
              {selectedItem ? selectedItem.name : ""}
            </div>
            <div className="iconWrapper">
              <Icon
                type={`${show ? "keyboard_arrow_up" : "keyboard_arrow_down"}`}
              />
            </div>
          </div>
        </div>
        <div
          className={`dropdownOptions ${show ? "show" : ""}`}
          ref={this.setWrapperRef}
        >
          {items}
        </div>
      </div>
    );
  }
}

export default Dropdown;
