import React, { Component } from "react";

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
                <th scope="col">IsCompleted</th>
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

export default ListTodoComponent;
