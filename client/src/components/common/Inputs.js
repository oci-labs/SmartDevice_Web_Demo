import React, { Component } from "react";
import "./Inputs.css";

import Icon from "../icons/Icon";

export const Input = ({ hide, model, name, onChange }) => {
  const handleOnChange = event => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  if (hide) {
    return null;
  }
  return (
    <div className="commonInputWrapper">
      <div className="commonInputLabel">
        {name}
      </div>
      <input
        className="commonInput"
        name={name}
        value={model}
        onChange={handleOnChange}
      />
    </div>
  );
};

export class Option extends Component {
  handleOptionClick = () => {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.item);
    }
  };
  setOptionRef = node => {
    this.wrapperRef = node;
    this.props.setRef(node);
  };
  handleEnterKey = event => {
    if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
      if (event.key === "Enter") {
        this.props.handleClick(this.props.item);
      }
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleEnterKey);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEnterKey);
  }
  render() {
    const { item } = this.props;
    return (
      <div
        className="option"
        onClick={this.handleOptionClick}
        ref={this.setOptionRef}
        tabIndex="0"
      >
        {item instanceof Object ? item.name : item}
      </div>
    );
  }
}

export class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selected: props.options ? props.options[0] : props.children[0]
    };
  }
  currentFocus;

  toggleOptions = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpen: false
      });
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  setChildRef = childNode => {
    if (!this.dropdownOptions) {
      this.dropdownOptions = [];
    }
    this.dropdownOptions.push(childNode);
  };

  handleKeydownEvents = event => {
    if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
      switch (event.key) {
        case "ArrowDown":
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
            this.currentFocus = 0;
          } else {
            if (this.currentFocus >= this.dropdownOptions.length - 1) {
              this.currentFocus = 0;
            } else {
              ++this.currentFocus;
            }
          }
          this.dropdownOptions[this.currentFocus].focus();
          break;
        case "ArrowUp":
          if (this.currentFocus === 0 || this.currentFocus === undefined) {
            this.setState({ isOpen: false });
            this.wrapperRef.focus();
          } else {
            this.dropdownOptions[--this.currentFocus].focus();
          }
          break;
        default:
          break;
      }
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeydownEvents);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeydownEvents);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.options !== this.props.options ||
      nextProps.children !== this.props.children
    ) {
      this.setState({
        selected: null
      });
    }
    if (nextProps.model) {
      this.setState({
        selected: nextProps.model
      });
    }
  }

  render() {
    const { isOpen, selected } = this.state;
    const { children, onChange } = this.props;
    let options;
    if (this.props.options) {
      options = this.props.options.map(option => {
        return <Option item={option} setRef={this.setChildRef} />;
      });
    }
    const disabled =
      this.props.disabled ||
      ((!options || options.length === 0) &&
        (!children || children.length === 0));

    if (!this.props.hideIf) {
      return (
        <div className="generalWrapper">
          <div className="commonSelectLabel">
            {this.props.name}
          </div>
          <div className={`commonSelectWrapper ${disabled ? "disabled" : ""}`}>
            <div className="commonSelect" ref={this.setWrapperRef} tabIndex="0">
              <div className="selected" onClick={this.toggleOptions}>
                <div className="selectedName">
                  {selected && selected.name ? selected.name : selected}
                </div>
                <Icon
                  type={
                    isOpen && !disabled
                      ? "keyboard_arrow_up"
                      : "keyboard_arrow_down"
                  }
                />
              </div>
              <div className={`optionsWrapper ${!isOpen ? "closed" : ""}`}>
                {React.Children.map(
                  options ? options : children,
                  (child, index) => {
                    const additionalProps = {
                      handleClick: item => {
                        this.setState({
                          isOpen: false,
                          selected: item
                        });
                        if (onChange) {
                          onChange(item);
                        }
                      },
                      tabIndex: "0"
                    };
                    return React.cloneElement(child, additionalProps);
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
