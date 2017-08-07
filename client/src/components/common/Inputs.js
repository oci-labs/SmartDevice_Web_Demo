import React, { Component } from "react";
import "./Inputs.css";

import Icon from "../icons/Icon";

export const Input = ({ model, name, onChange }) => {
  const handleOnChange = event => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
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

export const Option = ({ item, handleClick }) => {
  const handleOptionClick = () => {
    if (handleClick) {
      handleClick(item);
    }
  };
  return (
    <div className="option" onClick={handleOptionClick}>
      {item instanceof Object ? item.name : item}
    </div>
  );
};

export class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selected: props.options ? props.options[0] : props.children[0]
    };
  }

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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutside);
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
  }

  render() {
    const { isOpen, selected } = this.state;
    const { children, onChange } = this.props;
    let options;
    if (this.props.options) {
      options = this.props.options.map(function(option) {
        return <Option item={option} />;
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
            <div className="commonSelect" ref={this.setWrapperRef}>
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
                {React.Children.map(options ? options : children, child => {
                  const additionalProps = {
                    handleClick: item => {
                      if (onChange) {
                        onChange(item);
                      }
                      this.setState({
                        isOpen: false,
                        selected: item
                      });
                    }
                  };
                  return React.cloneElement(child, additionalProps);
                })}
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
