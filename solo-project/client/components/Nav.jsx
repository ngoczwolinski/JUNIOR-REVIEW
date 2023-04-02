import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import FirstPath from './FirstPath';
import Login from './Login';
const Nav = () => {
  return (
    <div>
      <h1>Nav</h1>
      <Link to="/">Home</Link>
      <Link to="/FirstPath">First Path</Link>
      <Link to="/Login">Login</Link>
    </div>
  );
};

export default Nav;
