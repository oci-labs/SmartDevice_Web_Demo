import React, { Component } from "react";
import ValveAlert from './ValveAlert';
import './Alerts.css';

class Alerts extends Component {
    render() {
        return (
            <div className="alertsContainer">
                <ValveAlert color="danger" leftIcon rightIcon valveNumber="1001014" alertType="Disconnected" station="6/6" time="1:15pm"/>
                <ValveAlert color="danger" leftIcon rightIcon valveNumber="1001014" alertType="Disconnected" station="6/6" time="1:15pm"/>
                <ValveAlert color="danger" leftIcon rightIcon valveNumber="1001014" alertType="Disconnected" station="6/6" time="1:15pm"/>
                <ValveAlert color="info" leftIcon valveNumber="20100105" alertType="Disconnected" station="6/5" time="11:42am"/>
                <ValveAlert color="disabled" leftIcon valveNumber="20100105" alertType="Disconnected" station="6/5" time="11:42am" />
            </div>
        );
    }
}

export default Alerts;
