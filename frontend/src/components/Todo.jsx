import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import withNavigationParams from "./NavigationParams/withNavigationParams";
//Services
import AuthenticatedRoute from "./AuthenticationRoute/AuthenticatedRoute";
//Components
import LoginComponent from "./LoginComponent";
import ListTodoComponent from "./ListTodoComponent";
import HeaderComponent from "./HeaderComponent";
import ErrorPageComponent from "./ErrorPageComponent";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import WelcomeComponent from "./WelcomeComponent";

//react router v6 update
class Todo extends Component {
  render() {
    let LoginComponentWithNavigate = withNavigationParams(LoginComponent);
    let WelcomeComponentWithParams = withNavigationParams(WelcomeComponent);
    let HeaderComponentWithNavigate = withNavigationParams(HeaderComponent);
    return (
      <div className="TodoApp">
        <HeaderComponentWithNavigate />
        <Routes>
          <Route path="/" element={<LoginComponentWithNavigate />} />
          <Route path="/login" element={<LoginComponentWithNavigate />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route
            path="/welcome/:name"
            element={
              <AuthenticatedRoute>
                <WelcomeComponentWithParams />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute>
            }
          />
          <Route path="*" element={<ErrorPageComponent />} />
        </Routes>
        <FooterComponent />
      </div>
    );
  }
}

export default Todo;
