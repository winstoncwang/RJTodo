import React, {Component} from 'react'
import { Route, Routes } from 'react-router-dom'
import withNavigationParams from './withNavigationParams';


//react router v6 update
class Todo extends Component {

    render() {
        let LoginComponentWithNavigate = withNavigationParams(LoginComponent);
        let WelcomeComponentWithParams = withNavigationParams(WelcomeComponent);
        return (
            <div className="TodoApp">
                    <Routes>   
                        <Route path="/" element={ <LoginComponentWithNavigate/> }/>
                        <Route path="/login" element={ <LoginComponentWithNavigate/> }/>
                        <Route path="/welcome/:name" element={ <WelcomeComponentWithParams/> } />
                        <Route path="*" element={ <ErrorPage/> }/>
                    </Routes>
            </div>
        );
    }
}

class WelcomeComponent extends Component {

    render() {
        return (
            <div>
                Welcome to the page {this.props.params.name}
            </div>
        );
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'test',
            password: 'test',
            showSuccessMessage: false,
            hasLoginFailed: false
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    loginClicked = () => {
        if (this.state.username === 'test' && this.state.password === 'test') {
            this.props.navigate(`/welcome/${this.state.username}`);
        } else {
            console.log("login failed");
            this.setState({showSuccessMessage:false});
            this.setState({hasLoginFailed:true});
        }
    }

  render() {
    return (
        <div>
            { this.state.hasLoginFailed && <div>Invalid Credentials</div>}
            { this.state.showSuccessMessage && <div>Login Successful</div>}
            Username: <input type="text" name="username" value={this.state.username} onChange={this.handleOnChange} />
            Password: <input type="password" name="password" value={ this.state.password } onChange={this.handleOnChange}/>
            <button onClick={ this.loginClicked }>Login</button>
      </div>
    );
  } 
}

class ErrorPage extends Component { 
      render() { 
          return (<div>Error Page 404</div>);
      }
  } 

export default Todo;