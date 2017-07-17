import React, { Component } from 'react';
import styles from './Nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="nav">
                Nav
                {this.props.children}
            </div>
        );
    }
}

export default Nav;