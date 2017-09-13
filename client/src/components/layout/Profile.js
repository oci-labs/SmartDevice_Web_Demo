import React from "react";
import { connect } from "react-redux";
import "./Profile.css";
import {
  goToPreviousViewState,
  setCurrentUser,
  setViewState
} from "../../actions/index";
import * as states from "../common/view.config";
import View from "../common/View";
import ProfilePicture from "../profile/ProfilePicture";
import { Column } from "../layout/LayoutComponents";
import Login from "../auth/Login";

const ProfileComponent = ({
  viewProfile,
  currentUser,
  goToAdminState,
  goToPreviousState,
  handleLogout
}) => {
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
          <View className="adminButton" states={[states.ADMIN_STATE]}>
            <button onClick={goToPreviousState}>Back to Main View</button>
          </View>
          <View
            className="adminButton"
            states={[
              states.DEPARTMENT_STATE,
              states.FACILITY_STATE,
              states.MACHINE_STATE,
              states.MANIFOLD_STATE
            ]}
          >
            <button onClick={goToAdminState}>Admin</button>
          </View>
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
    goToAdminState: () => {
      dispatch(setViewState(states.ADMIN_STATE));
    },
    goToPreviousState: () => {
      dispatch(goToPreviousViewState());
    },
    handleLogout: () => {
      dispatch(setCurrentUser(null));
    }
  };
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Profile;
