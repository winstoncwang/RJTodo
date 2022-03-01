import React, { Component } from "react";
import { Link } from "react-router-dom";

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

export default WelcomeComponent;
