import React from "react";

export const Row = ({className, children}) => {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flex: "1 0 0"
  };
  return (
    <div className={className} style={rowStyle}>
      {children}
    </div>
  );
};

export const Column = ({className, children}) => {
  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 0"
  };
  return (
    <div className={className} style={columnStyle}>
      {children}
    </div>
  );
};

export const HorizontalLine = () => {
  const lineStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "#666666"
  };

  return <div style={lineStyle}/>;
};

export const VerticalLine = () => {
  const lineStyle = {
    content: "asdf",
    display: "flex",
    width: "1px",
    minHeight: "100%",
    height: "100%",
    backgroundColor: "#666666"
  };

  return <div style={lineStyle}/>;
};
