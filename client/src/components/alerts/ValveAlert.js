import React, {Component} from "react";
import {Alert} from 'reactstrap';
import Disconnect from '../icons/Disconnect';
import Gauge from'../icons/Gauge';
import {MdNotificationsOff} from 'react-icons/lib/md';
import './Alerts.css';

class ValveAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };
  }

  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {

    const {color, leftIcon, rightIcon, valveNumber, station, alertType, time} = this.props;

    return (
      <Alert color={color === 'disabled' ? '' : color} className={color === 'disabled' ? 'disabled' : ''}
             isOpen={this.state.visible}>
        {leftIcon && (
          <div className="alert-icon-left">
            {(() => {
              switch (leftIcon) {
                case 'Disconnected':
                  return <Disconnect size="32" color={color === 'disabled' ? '#777' : 'white'}/>;
                case 'Gauge':
                  return <Gauge size="32" color={color === 'disabled' ? '#777' : 'white'}/>;
                default:
                  return null;
              }
            })()}
          </div>
        ) }
        {/* this.props.alertContent */}
        <div className="alert-content">
          <strong>Valve {valveNumber}</strong><br />
          <span className="alert-details">{alertType}: {station} - {time}</span>
        </div>
        <div className="alert-icon-right">
          {rightIcon && (
            <MdNotificationsOff size={32} onClick={this.onDismiss}/>
          )}
        </div>
      </Alert>
    );
  }
}

export default ValveAlert;
