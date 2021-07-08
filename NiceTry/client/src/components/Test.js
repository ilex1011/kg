import React from "react";
import { Link } from "react-router-dom";

const Test = () => {

 
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome to Todo City</h1>
      <p>Sign In </p>
      <Link to = "/login/client" className = "btn btn-primary">Client</Link>
      <Link to = "/login/staff" className = "btn btn-primary ml-3">Staff</Link>
    </div>
  );
};
export default Test;