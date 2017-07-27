import React, { Component } from "react";

class Icon extends Component {
  render() {
    return (
      <span className={this.props.className} onClick={this.props.handleClick}>
        <i className="material-icons">
          {this.props.type}
        </i>
      </span>
    );
  }
}

export default Icon;
