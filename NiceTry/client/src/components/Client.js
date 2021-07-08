import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";


const Client = ({setAuth1}) => {
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
      setAuth1(false);
      
    } catch (err) {
      console.error(err.message);
    }
    
  };

  useEffect(() => {
    getTodos();
  }, []);

  //console.log(todos);

  return (
    <Fragment>
      {" "}
      <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
    
      
     
      <table class="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th>SO number</th>
            <th>AWB</th>
            <th>Date 日期</th>
            
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
           
            </tr>
          ))}
        </tbody>
      </table>
      
    </Fragment>
  );
};

export default Client;