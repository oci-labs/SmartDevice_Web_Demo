import React from 'react';
import './User.css';

import Icon from '../icons/Icon';
import EditUser from './edit-user';

const User = ({
  index,
  onDelete,
  onEdit,
  user,
  showModal,
  onToggleModal,
  isValid
}) => {
  const deleteUser = () => {
    onDelete(user);
  };
  const editUser = () => {
    console.log('The editUser is: ', user);
    onEdit(user);
  };
  return (
    <div className={`user ${index % 2 === 1 ? 'even' : 'odd'}`}>
      <div className="field">{user.username}</div>
      <div className="field">{user.email}</div>
      <div className="field">{user.passwordExpired ? 'true' : 'false'}</div>
      <div className="field">{user.roles}</div>
      <EditUser
        user={user}
        onEditUser={onEdit}
        showModal={showModal}
        isValid={isValid}
        onToggleModal={onToggleModal}
      />
      <div>
        <Icon className="userDelete" type="delete" handleClick={deleteUser} />
      </div>
    </div>
  );
};

export default User;
