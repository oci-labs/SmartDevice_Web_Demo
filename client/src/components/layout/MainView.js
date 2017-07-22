import React, {Component} from 'react';
import './MainView.css';

class MainView extends Component {
    render() {
        return (
            <div className="mainView">
                MainView
                {this.props.children}
            </div>
        );
    }
}

export default MainView;