import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import withNavigationParams from './withNavigationParams';


//react router v6 update
class Todo extends Component {

    render() {
        let LoginComponentWithNavigate = withNavigationParams(LoginComponent);
        let WelcomeComponentWithParams = withNavigationParams(WelcomeComponent);
        return (
            <div className="TodoApp">
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<LoginComponentWithNavigate />} />
                    <Route path="/login" element={<LoginComponentWithNavigate />} />
                    <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                    <Route path="/todos" element={<ListTodoComponent />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <FooterComponent />
            </div>
        );
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <div className="headerContainer">
                <span>Header</span>
            </div>
        );
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div className="footerContainer">
                <span>Footer</span>
            </div>
        );
    }
}

class ListTodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                    { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
                    { id: 2, description: 'Learn Java', done: false, targetDate: new Date() },
                    { id: 3, description: 'Build Web App', done: false, targetDate: new Date() },
                ]
        }
    }

    todoMapping = () => {
        return this.state.todos.map((todo) =>
            <tr>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
            </tr>
        )

    }

    render() {
        return (
            <div className='listPage'>
                <h1>List Todos</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>description</th>
                                <th>Is Completed</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.todoMapping()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class WelcomeComponent extends Component {

    render() {
        return (
            <div className='welcomePage'>
                <p>
                    Welcome to the page {this.props.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>.
                </p>
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
            this.setState({ showSuccessMessage: false });
            this.setState({ hasLoginFailed: true });
        }
    }

    render() {
        return (
            <div className='loginPage'>
                <div>
                    {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleOnChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleOnChange} />
                    <button onClick={this.loginClicked}>Login</button>
                </div>
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