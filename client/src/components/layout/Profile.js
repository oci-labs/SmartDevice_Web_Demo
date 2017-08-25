import React from "react";
import { connect } from "react-redux";
import { Input, Select } from "../common/Inputs";
import "./Profile.css";

import ProfilePicture from "../profile/ProfilePicture";
import { Column } from "../layout/LayoutComponents";
import Login from "../layout/Login";

const ProfileComponent = ({ viewProfile, currentUser }) => {
  return (
    <div className="profile">
      { currentUser ?
        <Column>
          <ProfilePicture />
          <div className="profileTitle">Brian Jenkins</div>
          <div className="profileRoles">
            <span>Technician</span> | <span className="logout">Logout</span>
          </div>
          <button className="adminButton">Admin</button>
        </Column> :
        <Column>
          <Login />
        </Column>
      }

    </div>
  );
};

const mapStateToProps = state => {
  return {
    viewProfile: state.viewProfile,
    currentUser: state.currentUser
  };
};

const Profile = connect(mapStateToProps)(ProfileComponent);

export default Profile;
