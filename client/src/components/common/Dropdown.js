import React, { Component } from "react";
import "./Dropdown.css";

import Icon from "../icons/Icon";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null,
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
  }

  render() {
    let items = [];
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
          <div className="dropdownItem">
            <div className="labelWrapper">
              {this.state.selectedItem ? this.state.selectedItem.name : ""}
            </div>
            <div className="iconWrapper">
              <Icon
                type={`${this.state.show
                  ? "keyboard_arrow_up"
                  : "keyboard_arrow_down"}`}
                handleClick={this.expandDropdown}
              />
            </div>
          </div>
        </div>
        <div
          className={`dropdownOptions ${this.state.show ? "show" : ""}`}
          ref={this.setWrapperRef}
        >
          {items}
        </div>
      </div>
    );
  }
}

export default Dropdown;
