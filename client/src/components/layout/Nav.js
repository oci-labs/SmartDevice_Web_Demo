import React from "react";
import { connect } from "react-redux";
import "./Nav.css";
import { IconExpand, IconMenu, IconNotification } from "../icons/NexmatixIcons";
import { Badge } from "reactstrap";
import { toggleProfile, toggleAlerts } from "../../actions";

const NavComponent = ({ alerts, toggleAlerts, toggleProfile }) => {
  let activeAlerts = [];
  if (alerts) {
    activeAlerts = alerts.filter(alert => {
      return alert.isActive;
    });
  }

  return (
    <div className="nav">
      <div className="toggleProfile" onClick={toggleProfile}>
        <IconMenu width="24" height="24" color="#fff" />
      </div>
      <div className="companyTitle">Continental</div>
      <div className="spacing" />
      <div className="rightNavIcons">
        <IconExpand width="32" height="32" color="#777" />
        <IconNotification
          width="32"
          height="32"
          color="#777"
          onClick={toggleAlerts}
        />
        {activeAlerts.length > 0 &&
          <Badge color="danger" pill onClick={toggleAlerts}>
            {activeAlerts.length}
          </Badge>}
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
    toggleAlerts: function() {
      console.log("clicked alerts");
      dispatch(toggleAlerts());
    },
    toggleProfile: function() {
      dispatch(toggleProfile());
    }
  };
};

const Nav = connect(mapStateToProps, mapDispatchToProps)(NavComponent);

export default Nav;
