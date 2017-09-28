import React, { Component } from "react";
import { connect } from "react-redux";
import "./Admin.css";

import Users from "../admin/Users";
import AddUser from "../admin/AddUser";
import { getAllUsers } from "../../actions";

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.props.getUsers();
  }
  render() {
    return (
      <div className="admin">
        <AddUser />
        <Users users={this.props.users} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getAllUsers());
    }
  };
};

const Admin = connect(mapStateToProps, mapDispatchToProps)(AdminComponent);

export default Admin;
