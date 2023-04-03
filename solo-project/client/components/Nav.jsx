import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import MakerSquare from './MakerSquare';
import Login from './Login';
const Nav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/makersquare">Square Maker</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Nav;
