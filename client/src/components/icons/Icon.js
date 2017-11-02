import React from 'react';

const Icon = ({className, handleClick, type}) => (
  <span className={className} onClick={handleClick}>
    <i className="material-icons">{type}</i>
  </span>
);

export default Icon;
