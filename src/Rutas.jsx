import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { View } from './components/View';
import { Create } from './components/Create';
import { EditTask } from './components/EditTask';
import { NavBar } from './helper/NavBar';
import { RegisterUser } from './RegisterUser';

export const Rutas = () => {
  const isUserRegistered = true; // Aquí debes verificar si el usuario está registrado

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route
          path="/"
          element={isUserRegistered ? <View /> : <Navigate to="/register" />}
        />
        <Route
          path="/create"
          element={isUserRegistered ? <Create /> : <Navigate to="/register" />}
        />
        <Route
          path="/edit/:id"
          element={isUserRegistered ? <EditTask /> : <Navigate to="/register" />}
        />
      </Routes>
    </Router>
  );
};