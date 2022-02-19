import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import TodoApp from './components/TodoApp.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <TodoApp/>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
