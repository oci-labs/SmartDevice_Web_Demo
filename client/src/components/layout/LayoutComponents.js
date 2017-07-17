import React, {Component} from 'react';

export class Row extends Component {
    render() {
        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            flex: '1 0 0'
        };
        return (
            <div style={rowStyle}>{this.props.children}</div>
        );
    }
}

export class Column extends Component {
    render() {
        const columnStyle = {
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 0'
        };
        return (
            <div style={columnStyle}>{this.props.children}</div>
        );
    }
}