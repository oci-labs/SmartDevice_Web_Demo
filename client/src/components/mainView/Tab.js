import React from 'react';
import {connect} from 'react-redux';
import './Tab.css';
import {setSelectedItem} from '../../actions';

const TabComponent = ({active, item, handleTabClick, label, selected}) => {
  const tabClick = () => {
    handleTabClick(item);
  };

  return (
    <div
      className={`tabContainer ${active ? 'active' : ''} ${label
        ? 'tabLabel'
        : ''} ${selected ? 'selected' : ''}`}
      onClick={tabClick}
    >
      <div className="tabMain">{item.name}</div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  handleTabClick(item) {
    dispatch(setSelectedItem(item));
  }
});

const Tab = connect(null, mapDispatchToProps)(TabComponent);

export default Tab;
