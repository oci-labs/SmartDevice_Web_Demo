import React from "react";
import "./User.css";

import Icon from "../icons/Icon";

const User = ({ index, onDelete, onEdit, user }) => {
  const deleteUser = () => {
    onDelete(user);
  };
  const editUser = () => {
    onEdit(user);
  };
  return (
    <div className={`user ${index % 2 === 1 ? "even" : "odd"}`}>
      <div className="field">{user.username}</div>
      <div className="field">{user.email}</div>
      <div className="field">{user.passwordExpired ? "true" : "false"}</div>
      <div className="field">{user.roles}</div>
      <div>
        <Icon className="userDelete" type="edit" handleClick={editUser} />
      </div>
      <div>
        <Icon className="userDelete" type="delete" handleClick={deleteUser} />
      </div>
    </div>
  );
};

export default User;
