import React from "react";
import { connect } from "react-redux";
import "./Profile.css";
import * as states from "../common/view.config";
import View from "../common/View";
import ProfilePicture from "../profile/ProfilePicture";
import { Column } from "../layout/LayoutComponents";
import Login from "../auth/Login";
import { goToPreviousViewState, setViewState } from '../../redux-modules/view/actions';
import { userLogout } from '../../redux-modules/current-user/actions';

const ProfileComponent = ({
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
          <div className="profileTitle">{currentUser.username}</div>
          <div className="profileRoles">
            <span>Technician</span> |{" "}
            <span className="logout" onClick={handleLogout}>
              Logout
            </span>
          </div>
          <View className="adminButton" states={[states.ADMIN_STATE]}>
            <button onClick={goToPreviousState}>Main View</button>
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
    viewProfile: state.view.viewProfile,
    currentUser: state.currentUser.user
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
      dispatch(userLogout());
    }
  };
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Profile;
