import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classNames from 'classnames';
import Icon from '../icons/Icon';
import TextInput from '../inputs/TextInput';
import './add-user.css';

const displayName = 'EditUser';
const propTypes = {
    isValid: PropTypes.bool,
    onEditUser: PropTypes.func,
    onToggleModal: PropTypes.func,
    showModal: PropTypes.bool,
    user: PropTypes.object
};

const EditUser = ({ user, isValid, showModal, onToggleModal, onEditUser }) => (
    <div className="editUser">
        <div>
            <Icon className="userDelete" type="edit" handleClick={onToggleModal} />
        </div>
        <Modal className="commonModal addUserModal" isOpen={showModal} toggle={onToggleModal}>
            <div className="closeButton">
                <Icon type="close" handleClick={onToggleModal} />
            </div>
            <ModalHeader>Update User</ModalHeader>
            <ModalBody>
                <TextInput model="forms.editUser.id" value={user.id} name="Id" readOnly />
                <TextInput model="forms.editUser.username" value={user.username} name="Username" readOnly />
                <TextInput model="forms.editUser.email" value={user.email} name="E-mail" type="email" readOnly="false"/>
            </ModalBody>
            <ModalFooter>
                <button
                    disabled={!isValid}
                    className={classNames('addUserModalButton', { enabled: isValid })}
                    onClick={onEditUser}>
                    Update User
                </button>
            </ModalFooter>
        </Modal>
    </div>
);

EditUser.displayName = displayName;
EditUser.propTypes = propTypes;

export default EditUser;
