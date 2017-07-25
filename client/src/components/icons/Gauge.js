import React, { Component } from "react";

class Gauge extends Component {
    render() {
        return (
        <svg xmlns="http://www.w3.org/2000/svg" width={this.props.size} height={this.props.size} viewBox="0 0 32 32">
            <g stroke={this.props.color}>
            <circle cx="16.231" cy="11.692" r="9.722" fill="none" strokeWidth="2.633" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16.458" cy="11.875" r="1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fill="none" strokeWidth="2" d="M16 12l5-4" strokeLinecap="round"/>
            <path fill="none" strokeWidth="2" d="M14 21v4m-8 1h9m3-5v4m8 1h-9M6 30h20"/>
            </g>
        </svg>
        );
    }
}

export default Gauge;
