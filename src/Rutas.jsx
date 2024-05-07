import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { View } from './components/View';
import { Create } from './components/Create';
import { EditTask } from './components/EditTask';
import { NavBar } from './helper/NavBar';

export const Rutas = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
};