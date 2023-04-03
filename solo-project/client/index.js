//--------------------------------- START OF IMPORT-----------------------------
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import MakerSquare from './components/MakerSquare.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';

// ----------------------- START OF REACT & REACT ROUTER -----------------------
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/makersquare" element={<MakerSquare />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
