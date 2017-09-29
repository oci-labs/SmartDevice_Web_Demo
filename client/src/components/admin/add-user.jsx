import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classNames from 'classnames';
import Icon from '../icons/Icon';
import TextInput from '../inputs/TextInput';
import './add-user.css';

const displayName = 'AddUser';
const propTypes = {
  isValid: PropTypes.bool,
  onAddUser: PropTypes.func,
  onToggleModal: PropTypes.func,
  showModal: PropTypes.bool
};

const AddUser = ({ isValid, showModal, onToggleModal, onAddUser }) => (
  <div className="addUser">
    <div>
      <button className="addUserButton" onClick={onToggleModal}>
        Add a User
      </button>
    </div>
    <Modal className="commonModal addUserModal" isOpen={showModal} toggle={onToggleModal}>
      <div className="closeButton">
        <Icon type="close" handleClick={onToggleModal} />
      </div>
      <ModalHeader>Add New User</ModalHeader>
      <ModalBody>
        <TextInput model="forms.addUser.username" name="Username" />
        <TextInput model="forms.addUser.password" name="Password" type="password" />
        <TextInput model="forms.addUser.email" name="E-mail" type="email" />
      </ModalBody>
      <ModalFooter>
        <button
          disabled={!isValid}
          className={classNames('addUserModalButton', { enabled: isValid })}
          onClick={onAddUser}>
          Add User
        </button>
      </ModalFooter>
    </Modal>
  </div>
);

AddUser.displayName = displayName;
AddUser.propTypes = propTypes;

export default AddUser;
