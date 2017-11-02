import React from 'react';
import {connect} from 'react-redux';
import './Users.css';

import {actions} from 'react-redux-form';

import {toggleEditUserModal} from '../../redux-modules/view/actions';
import {selectShowEditUserModal} from '../../selectors/view-selectors';
import {
  selectFormIsValid,
  selectExistingUser
} from '../../selectors/user-selectors';

import User from './User';
import {deleteUser, editUser} from '../../actions/UserActions';

const UsersComponent = ({
  handleUserDelete,
  handleUserEdit,
  users,
  showModal,
  isValid,
  onToggleModal
}) => (
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
          showModal={showModal}
          onToggleModal={onToggleModal}
          isValid={isValid}
        />
      );
    })}
  </div>
);

const mapStateToProps = state => ({
  showModal: selectShowEditUserModal(state),
  isValid: selectFormIsValid(state)
});

const mapDispatchToProps = dispatch => ({
  handleUserDelete: user => {
    console.log('User in delete is: ', user);
    dispatch(deleteUser(user));
  },
  handleUserEdit: () =>
    dispatch((dispatch, getState) => {
      if (selectFormIsValid(getState())) {
        dispatch(editUser(selectExistingUser(getState())));
        dispatch(toggleEditUserModal());
        dispatch(actions.reset('forms.addUser'));
      } else {
        console.log('Add user form is not valid.');
      }
    }),
  onToggleModal: () => {
    dispatch(actions.reset('forms.editUser'));
    dispatch(toggleEditUserModal());
  }
});

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default Users;
