import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AddUser.css';
import validator from 'validator';
import { addNewUser } from '../../actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input } from '../common/Inputs';
import { toggleUserModal } from '../../redux-modules/view/actions';
import { selectShowUserModal } from '../../selectors/view-selectors';
import Icon from '../icons/Icon';

const propTypes = {
  handleAddUser: PropTypes.func,
  showModal: PropTypes.bool,
  toggleUserModal: PropTypes.func
};

class AddUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: ''
    };
  }

  handleUsernameChange = username => {
    this.setState({
      username
    });
  };

  handlePasswordChange = password => {
    this.setState({
      password
    });
  };

  handleEmailChange = email => {
    this.setState({
      email
    });
  };

  addUser = () => {
    if (!validator.isEmail(this.state.email)) {
      console.log('is not an email');
    } else {
      this.props.handleAddUser({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      });
    }
  };

  render() {
    return (
      <div className="addUser">
        <div>
          <button className="addUserButton" onClick={this.props.toggleUserModal}>
            Add a User
          </button>
        </div>
        <Modal
          className="commonModal addUserModal"
          isOpen={this.props.showModal}
          toggle={this.props.toggleUserModal}>
          <div className="closeButton">
            <Icon type="close" handleClick={this.props.toggleUserModal} />
          </div>
          <ModalHeader>Add New User</ModalHeader>
          <ModalBody>
            <Input name="Username" onChange={this.handleUsernameChange} />
            <Input name="Password" type="password" onChange={this.handlePasswordChange} />
            <Input name="E-mail" type="email" onChange={this.handleEmailChange} />
          </ModalBody>
          <ModalFooter>
            <button className="addUserModalButton add" onClick={this.addUser}>
              Add User
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

AddUserComponent.propTypes = propTypes;

const mapStateToProps = state => ({
  showModal: selectShowUserModal(state)
});

const mapDispatchToProps = dispatch => ({
  handleAddUser: user => {
    dispatch(addNewUser(user));
    dispatch(toggleUserModal());
  },
  toggleUserModal: () => dispatch(toggleUserModal())
});

const AddUser = connect(mapStateToProps, mapDispatchToProps)(AddUserComponent);

export default AddUser;
