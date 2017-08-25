import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "../common/Inputs";
import { postCurrentUser } from "../../actions";
//import "./Login.css";

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUserChange = username => {
    this.setState({
      username: username
    });
  }
  handlePwChange = password => {
    this.setState({
      password: password
    });
  }
  handleLogin = () => {
    this.props.handleLogin(this.state.username, this.state.password)
  }
  render() {
    const {currentUser, handleLogin } = this.props;
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
        <button className="loginButton" onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleLogin: function(username, password) {
      dispatch(postCurrentUser(username, password));
    }
  }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;