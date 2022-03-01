import React, { Component } from "react";
import AuthenticationService from "../services/AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "test",
      password: "test",
      showSuccessMessage: false,
      hasLoginFailed: false,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginClicked = () => {
    if (this.state.username === "test" && this.state.password === "test") {
      AuthenticationService.registerSuccessfulLogin(
        this.state.username,
        this.state.password
      );
      this.props.navigate(`/welcome/${this.state.username}`);
    } else {
      console.log("login failed");
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFailed: true });
    }
  };

  render() {
    return (
      <div className="loginPage">
        <div className="container">
          {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
          <form>
            <div className="form-group col px-0">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleOnChange}
                placeholder="Username"
              ></input>
            </div>
            <div className="form-group col px-0">
              <label className="" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleOnChange}
                placeholder="Password"
              ></input>
            </div>
            <div className="form-group form-check px-0 align-items-center">
              <input type="checkbox" id="rememberMe" />
              <label className="my-0 px-2" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button className="btn btn-dark" onClick={this.loginClicked}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
