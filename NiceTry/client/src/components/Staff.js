import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import './Staff.css';


const Staff = ({setAuth2}) => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(test => test.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e =>{
    try {
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth2(false);
      
    } catch (err) {
      console.error(err.message);
    }
    
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      {" "}
      
      <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      <InputTodo/>
     
      
      
      <table class="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th>SO number</th>
            <th>AWB</th>
            <th>Date 日期</th>
            <th>Edit 更改</th>
            <th>Delete 刪除</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.map(test => (
            <tr key={test.todo_id}>
              <td>{test.sonumber}</td>
              <td>{test.awh}</td>
              <td>{test.pdate}</td>
              <td>
                <EditTodo test={test} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(test.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </Fragment>
  );
};

export default Staff;