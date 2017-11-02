import React from 'react';
import Icon from '../icons/Icon';
import './ValveIcon.css';

const ValveIcon = ({children, handleClick, size, warning}) => (
  <div
    className={`valveIconWrapper ${size} ${handleClick ? 'clickable' : ''}`}
    onClick={handleClick}
  >
    <div className="iconContainer">
      <div className={`valveIconContainer ${warning ? 'warning' : ''}`}>
        <div className="valveIconBorder">
          <Icon
            className="valveIconCheck"
            type={`${warning ? 'alarm_on' : 'check'}`}
          />
        </div>
      </div>
    </div>
    <div className="valveIconLabel">{children}</div>
  </div>
);

export default ValveIcon;
