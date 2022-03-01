import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService.js";

class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return { ...this.props.children };
    } else {
      console.log("Please log in first.");
      return <Navigate to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
