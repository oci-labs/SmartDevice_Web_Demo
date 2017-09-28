import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AddUser.css';
import { actions } from 'react-redux-form';
import { addNewUser } from '../../actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toggleUserModal } from '../../redux-modules/view/actions';
import { selectShowUserModal } from '../../selectors/view-selectors';
import Icon from '../icons/Icon';
import TextInput from '../inputs/TextInput';
import {
  selectFormIsValid,
  selectNewUser
} from '../../selectors/add-user-selectors';

const displayName = 'AddUser';
const propTypes = {
  handleAddUser: PropTypes.func,
  isValid: PropTypes.bool,
  showModal: PropTypes.bool,
  toggleUserModal: PropTypes.func
};

const AddUser = ({ toggleUserModal, showModal, handleAddUser, isValid }) => (
  <div className="addUser">
    <div>
      <button className="addUserButton" onClick={toggleUserModal}>
        Add a User
      </button>
    </div>
    <Modal
      className="commonModal addUserModal"
      isOpen={showModal}
      toggle={toggleUserModal}>
      <div className="closeButton">
        <Icon type="close" handleClick={toggleUserModal} />
      </div>
      <ModalHeader>Add New User</ModalHeader>
      <ModalBody>
        <TextInput model="forms.addUser.username" name="Username" />
        <TextInput model="forms.addUser.password" name="Password" type="password" />
        <TextInput model="forms.addUser.email" name="E-mail" type="email" />
      </ModalBody>
      <ModalFooter>
        <button disabled={!isValid} className="addUserModalButton add" onClick={handleAddUser}>
          Add User
        </button>
      </ModalFooter>
    </Modal>
  </div>
);

AddUser.displayName = displayName;
AddUser.propTypes = propTypes;

const mapStateToProps = state => ({
  showModal: selectShowUserModal(state),
  isValid: selectFormIsValid(state)
});

const mapDispatchToProps = dispatch => ({
  handleAddUser: () =>
    dispatch((dispatch, getState) => {
      if (selectFormIsValid(getState())) {
        dispatch(addNewUser(selectNewUser(getState())));
        dispatch(toggleUserModal());
        dispatch(actions.reset('forms.addUser'));
      } else {
        console.log('Add user form is not valid.');
      }
    }),
  toggleUserModal: () => {
    dispatch(actions.reset('forms.addUser'));
    dispatch(toggleUserModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
