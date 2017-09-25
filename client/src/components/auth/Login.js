import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "../common/Inputs";
import { postUserAuth } from "../../actions/index";
//import "./Login.css";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUserChange = username => {
    this.setState({
      username: username
    });
  };
  handlePwChange = password => {
    this.setState({
      password: password
    });
  };
  handleLogin = () => {
    this.props.handleLogin(this.state.username, this.state.password);
  };
  render() {
    return (
      <div className="loginWrapper">
        <Input
          name="Username"
          model={this.state.username}
          onChange={this.handleUserChange}
        />
        <Input
          name="Password"
          type="password"
          model={this.state.password}
          onChange={this.handlePwChange}
        />
        <button className="loginButton" onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.userName
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleLogin: function(username, password) {
      dispatch(postUserAuth(username, password));
    }
  };
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;
