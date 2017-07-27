import React, { Component } from "react";
import "./Dropdown.css";

import Icon from "../icons/Icon";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: this.props.items[0],
      show: false
    };
  }
  expandDropdown = () => {
    console.log("Expanding dropdown");
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    const self = this;
    const items = this.props.items.map(function(item, index) {
      const selectItem = () => {
        self.setState({
          selectedItem: item,
          show: false
        });
      };
      return (
        <div key={index} className="dropdownItem" onClick={selectItem}>
          {item.name}
        </div>
      );
    });
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
        <div className={`dropdownOptions ${this.state.show ? "show" : ""}`}>
          {items}
        </div>
      </div>
    );
  }
}

export default Dropdown;
