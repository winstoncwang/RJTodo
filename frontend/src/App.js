import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './style/App.css';
import './style/Todo.css';

import Todo from './components/Todo.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Todo />
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
