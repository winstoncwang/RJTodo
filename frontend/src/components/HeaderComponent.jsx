import React, { Component } from "react";
import { Link } from "react-router-dom";

//service
import AuthenticationService from "../services/AuthenticationService";

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

export default HeaderComponent;
