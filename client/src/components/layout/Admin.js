import React, { Component } from "react";
import { connect } from "react-redux";
import "./Admin.css";
import { getAllUsers } from "../../actions";

class AdminComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleAddUserClick = () => {
    this.props.handleGetAllUsers();
  };
  render() {
    return (
      <div className="admin">
        <button className="addUserButton" onClick={this.handleAddUserClick}>
          Add a User
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetAllUsers: () => {
      dispatch(getAllUsers());
    }
  };
};

const Admin = connect(null, mapDispatchToProps)(AdminComponent);

export default Admin;
