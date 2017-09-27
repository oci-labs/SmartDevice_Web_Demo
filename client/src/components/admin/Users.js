import React from "react";
import { connect } from "react-redux";
import "./Users.css";

import User from "./User";
import { deleteUser, editUser } from '../../actions/UserActions';

const UsersComponent = ({ handleUserDelete, handleUserEdit, users }) => {
  return (
    <div>
      <div className="userHeaders">
        <div className="userHeaderfield">Username</div>
        <div className="userHeaderfield">E-mail</div>
        <div className="userHeaderfield">Password Expired</div>
        <div className="userHeaderfield">Roles</div>
      </div>
      {users.map((user, index) => {
        const deleteUser = () => {
          handleUserDelete(user);
        };
        const editUser = userToEdit => {
          handleUserEdit(userToEdit);
        };
        return (
          <User
            key={user.id}
            user={user}
            onDelete={deleteUser}
            onEdit={editUser}
            index={index}
          />
        );
      })}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleUserDelete: user => {
      dispatch(deleteUser(user));
    },
    handleUserEdit: user => {
      dispatch(editUser(user));
    }
  };
};

const Users = connect(null, mapDispatchToProps)(UsersComponent);

export default Users;
