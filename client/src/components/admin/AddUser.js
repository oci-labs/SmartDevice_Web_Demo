import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddUser.css";
import validator from "validator";
import { addNewUser } from "../../actions";

import Modal from "../common/Modal";
import { Input } from "../common/Inputs";

class AddUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
      showModal: false
    };
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false
    });
  };

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
      console.log("is not an email");
    } else {
      this.props.handleAddUser({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      });
      this.onModalClose();
    }
  };

  render() {
    return (
      <div className="addUser">
        <div onClick={this.openModal}>{this.props.children}</div>
        <Modal show={this.state.showModal} onClose={this.onModalClose}>
          <div className="addUserModalTitle">Add New User</div>
          <Input name="Username" onChange={this.handleUsernameChange} />
          <Input
            name="Password"
            type="password"
            onChange={this.handlePasswordChange}
          />
          <Input name="E-mail" type="email" onChange={this.handleEmailChange} />
          <button className="addUserModalButton" onClick={this.addUser}>
            Add User
          </button>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddUser: user => {
      dispatch(addNewUser(user));
    }
  };
};

const AddUser = connect(null, mapDispatchToProps)(AddUserComponent);

export default AddUser;
