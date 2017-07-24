import React, { Component } from "react";

class Disconnect extends Component {
    render() {
        return (
        <svg xmlns="http://www.w3.org/2000/svg" width={this.props.size} height={this.props.size} viewBox="0 0 32 32">
            <g fill="none" stroke={this.props.color} strokeWidth="2">
            <path d="M8 11h16v16H8z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.57 26.43l14.86-14.86"/>
            <path d="M8 17H2m0 4h6m16 0h6m-6-4h6m-14-6V4M8 7h16" strokeLinecap="round"/>
            </g>
            </svg>
        );
    }
}

export default Disconnect;
