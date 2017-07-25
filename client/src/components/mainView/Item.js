import React from "react";
import "./Item.css";

const Item = ({ children }) => {
  return (
    <div className="nexmatix-item">
      {children}
    </div>
  );
};

export default Item;
