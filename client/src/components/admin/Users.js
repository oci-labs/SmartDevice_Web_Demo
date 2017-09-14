import React from "react";
import { connect } from "react-redux";
import "./Users.css";
import { deleteUser } from "../../actions";

import User from "./User";

const UsersComponent = ({ handleUserDelete, users }) => {
  return (
    <div>
      <div className="userHeaders">
        <div className="userHeaderfield">Username</div>
        <div className="userHeaderfield">E-mail</div>
        <div className="userHeaderfield">Password Expired</div>
      </div>
      {users.map((user, index) => {
        const deleteUser = () => {
          handleUserDelete(user);
        };
        return (
          <User key={user.id} user={user} onDelete={deleteUser} index={index} />
        );
      })}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleUserDelete: user => {
      dispatch(deleteUser(user));
    }
  };
};

const Users = connect(null, mapDispatchToProps)(UsersComponent);

export default Users;
