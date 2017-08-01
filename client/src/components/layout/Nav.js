import React from "react";
import { connect } from "react-redux";
import "./Nav.css";

import Icon from "../icons/Icon";
import { toggleProfile } from "../../actions";

const NavComponent = ({ toggleProfile }) => {
  return (
    <div className="nav">
      <div className="toggleProfile" onClick={toggleProfile}>
        <Icon type="dehaze" />
      </div>
      <div className="companyTitle">Continental</div>
      <div className="spacing" />
      <div className="rightNavIcons">
        <Icon type="fullscreen" />
        <Icon type="warning" />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    toggleProfile: function() {
      dispatch(toggleProfile());
    }
  };
};

const Nav = connect(null, mapDispatchToProps)(NavComponent);

export default Nav;
