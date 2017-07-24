import React, { Component } from "react";
import { Alert } from 'reactstrap';
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

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }
    render() {
        return (
                <Alert color={this.props.color === 'disabled' ? '' : this.props.color} className={ this.props.color === 'disabled' ? 'disabled' : ''} isOpen={this.state.visible}>
                    { this.props.leftIcon && (
                        <div className="alert-icon-left">
                            {(() => {
                                switch(this.props.leftIcon) {
                                    case 'Disconnected':
                                        return <Disconnect size="32" color={this.props.color === 'disabled' ? '#777' : 'white'} />;
                                    case 'Gauge':
                                        return<Gauge size="32"color={this.props.color ==='disabled' ? '#777' : 'white'}/>;
                                    default:
                                        return null;
                                }
                            })()}
                        </div>
                    ) }
                    {/* this.props.alertContent */}
                    <div className="alert-content">
                        <strong>Valve {this.props.valveNumber}</strong><br />
                        <span className="alert-details">{this.props.alertType}: {this.props.station} - {this.props.time}</span>
                    </div>
                    <div className="alert-icon-right">
                        { this.props.rightIcon && (
                            <MdNotificationsOff size={32} onClick={this.onDismiss}/>
                        )}
                    </div>
                </Alert>
        );
    }
}

export default ValveAlert;
