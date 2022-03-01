import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import withNavigationParams from "./withNavigationParams";

import AuthenticationService from "../services/AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticatedRoute";

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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <FooterComponent />
      </div>
    );
  }
}

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  menuToggle = () => {
    this.setState({ menu: !this.state.menu });
  };

  render() {
    let show = this.state.menu ? "show" : "";

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    console.log(`${isUserLoggedIn ? "logged in" : "not logged in"}`);

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            RJ
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.menuToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " + show}>
            <ul className="navbar-nav">
              {isUserLoggedIn && (
                <li>
                  <Link className="nav-link " to="/welcome/Cong">
                    Home
                  </Link>
                </li>
              )}
              {isUserLoggedIn && (
                <li>
                  <Link className="nav-link " to="/todos">
                    Todos
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {!isUserLoggedIn && (
                <li>
                  <Link className="nav-link " to="/login">
                    Login
                  </Link>
                </li>
              )}
              {isUserLoggedIn && (
                <li>
                  <Link
                    className="nav-link "
                    to="/logout"
                    onClick={AuthenticationService.logout}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer bg-dark text-center">
        <span className="text-muted">@CongWang2022</span>
      </footer>
    );
  }
}

class ListTodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          description: "Learn React",
          done: false,
          targetDate: new Date(),
        },
        {
          id: 2,
          description: "Learn Java",
          done: false,
          targetDate: new Date(),
        },
        {
          id: 3,
          description: "Build Web App",
          done: false,
          targetDate: new Date(),
        },
      ],
    };
  }

  todoMapping = () => {
    return this.state.todos.map((todo) => (
      <tr key={todo.id}>
        <td>{todo.description}</td>
        <td>{todo.done.toString()}</td>
        <td>{todo.targetDate.toString()}</td>
      </tr>
    ));
  };

  render() {
    return (
      <div className="listPage container">
        <h1 className="text-center my-4">List Todos</h1>
        <div className="row justify-content-center">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Is Completed</th>
                <th scope="col">Target Date</th>
              </tr>
            </thead>
            <tbody>{this.todoMapping()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  render() {
    return (
      <div className="welcomePage">
        <p>
          Welcome to the page {this.props.params.name}. You can manage your
          todos <Link to="/todos">here</Link>.
        </p>
      </div>
    );
  }
}

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

class LogoutComponent extends Component {
  render() {
    return (
      <div className="text-center welcomePage">
        You have successfully logged out!
      </div>
    );
  }
}

class ErrorPage extends Component {
  render() {
    return <div className="welcomePage">Error Page 404</div>;
  }
}

export default Todo;
