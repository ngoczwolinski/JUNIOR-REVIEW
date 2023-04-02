//--------------------------------- START OF IMPORT-----------------------------
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error404 from './components/Error404.jsx';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import FirstPath from './components/FirstPath.jsx';
import Login from './components/Login.jsx';

// ----------------------- START OF REACT & REACT ROUTER -----------------------
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/FirstPath" element={<FirstPath />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>
);
