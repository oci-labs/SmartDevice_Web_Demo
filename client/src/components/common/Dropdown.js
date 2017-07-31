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

    const {selectedItem, show} = this.state;

    let items = null;
    if (this.props.items) {
      items = this.props.items.map((item, index) => {
        const selectItem = () => {
          this.setState({
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
    }
    return (
      <div className="dropdownContainer">
        <div className="selectedDropdownOption">
          <div className="dropdownItem">
            <div className="labelWrapper">
              {selectedItem ? selectedItem.name : ""}
            </div>
            <div className="iconWrapper">
              <Icon
                type={`${show
                  ? "keyboard_arrow_up"
                  : "keyboard_arrow_down"}`}
                handleClick={this.expandDropdown}
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
