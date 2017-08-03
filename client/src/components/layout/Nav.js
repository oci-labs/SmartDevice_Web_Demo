import React from "react";
import { connect } from "react-redux";
import "./Nav.css";
import { IconExpand, IconMenu, IconNotification } from "../icons/NexmatixIcons";
import { Badge } from 'reactstrap';
import Icon from "../icons/Icon";
import { toggleProfile } from "../../actions";

const NavComponent = ({ toggleProfile, alerts }) => {
    let activeAlerts;
    if (alerts) { activeAlerts = alerts.filter(alert => {
      return alerts.isActive
    })}
    console.log(activeAlerts);

  return (
    <div className="nav">
      <div className="toggleProfile" onClick={toggleProfile}>
          <IconMenu width="24"height="24" color="#fff" />
      </div>
      <div className="companyTitle">Continental</div>
      <div className="spacing" />
      <div className="rightNavIcons">
        <IconExpand width="32" height="32" color="#777" />
          <IconNotification width="32"height="32" color="#777" />{ alerts.length > 0 && <Badge color="danger" pill>{alerts.length}</Badge>}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
    return {
        alerts: state.alerts
    };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleProfile: function() {
      dispatch(toggleProfile());
    }
  };
};

const Nav = connect(mapStateToProps, mapDispatchToProps)(NavComponent);

export default Nav;
