import React from "react";
import "./User.css";

import Icon from "../icons/Icon";

const User = ({ index, onDelete, user }) => {
  const deleteUser = () => {
    onDelete(user);
  };
  return (
    <div className={`user ${index % 2 === 1 ? "even" : "odd"}`}>
      <div className="field">{user.username}</div>
      <div className="field">{user.email}</div>
      <div className="field">{user.passwordExpired ? "true" : "false"}</div>
      <div>
        <Icon className="userDelete" type="delete" handleClick={deleteUser} />
      </div>
    </div>
  );
};

export default User;
