import React from "react";
import { connect } from "react-redux";
import "./Profile.css";
import { setCurrentUser } from "../../actions/index";
import ProfilePicture from "../profile/ProfilePicture";
import { Column } from "../layout/LayoutComponents";
import Login from "../auth/Login";

const ProfileComponent = ({ viewProfile, currentUser, handleLogout }) => {
  return (
    <div className="profile">
      {currentUser ? (
        <Column>
          <ProfilePicture />
          <div className="profileTitle">Brian Jenkins</div>
          <div className="profileRoles">
            <span>Technician</span> |{" "}
            <span className="logout" onClick={handleLogout}>
              Logout
            </span>
          </div>
          <button className="adminButton">Admin</button>
        </Column>
      ) : (
        <Column>
          <Login />
        </Column>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    viewProfile: state.viewProfile,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => {
      dispatch(setCurrentUser(null));
    }
  };
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Profile;
