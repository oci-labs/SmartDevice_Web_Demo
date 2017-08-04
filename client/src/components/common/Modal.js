import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show ? props.show : false
    };
  }
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        show: false
      });
      this.props.onClose();
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

  componentWillReceiveProps(props) {
    this.setState({
      show: props.show
    });
  }

  render() {
    return (
      <div className={`background ${!this.state.show ? "hide" : ""}`}>
        <div ref={this.setWrapperRef}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
