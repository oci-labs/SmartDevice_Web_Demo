import React, { Component } from "react";

export class Row extends Component {
  render() {
    const rowStyle = {
      display: "flex",
      flexDirection: "row",
      flex: "1 0 0"
    };
    return (
      <div className={this.props.className} style={rowStyle}>
        {this.props.children}
      </div>
    );
  }
}

export class Column extends Component {
  render() {
    const columnStyle = {
      display: "flex",
      flexDirection: "column",
      flex: "1 0 0"
    };
    return (
      <div className={this.props.className} style={columnStyle}>
        {this.props.children}
      </div>
    );
  }
}

export class HorizontalLine extends Component {
  render() {
    const lineStyle = {
      width: "100%",
      height: "1px",
      backgroundColor: "#666666"
    };

    return <div style={lineStyle} />;
  }
}

export class VerticalLine extends Component {
  render() {
    const lineStyle = {
      content: "asdf",
      display: "flex",
      width: "1px",
      minHeight: "100%",
      height: "100%",
      backgroundColor: "#666666"
    };

    return <div style={lineStyle} />;
  }
}
