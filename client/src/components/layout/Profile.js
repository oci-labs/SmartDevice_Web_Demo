import React from "react";
import { connect } from "react-redux";
import "./Profile.css";

import ProfilePicture from "../profile/ProfilePicture";
import { Column } from "../layout/LayoutComponents";

const ProfileComponent = ({ viewProfile }) => {
  return (
    <div className="profile">
      <Column>
        <ProfilePicture />
        <div className="profileTitle">Brian Jenkins</div>
        <div className="profileRoles">
          <span>Technician</span> | <span className="logout">Logout</span>
        </div>
        <button className="adminButton">Admin</button>
      </Column>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    viewProfile: state.viewProfile
  };
};

const Profile = connect(mapStateToProps)(ProfileComponent);

export default Profile;
