import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { View } from './components/View';
import { Create } from './components/Create';
import { EditTask } from './components/EditTask';
import { NavBar } from './helper/NavBar';
 // Esto asegura que el efecto se ejecute cada vez que la lista de tareas cambie
import { LoginUser } from './components/LoginUser';

export const Rutas = () => {
  const isUserRegistered = true; // Aquí debes verificar si el usuario está registrado
  
     
  
  return (
    <Router>
      <NavBar />  
      <Routes>
        <Route path="/LoginUser" element={<LoginUser />} />
        <Route
          path="/"
          element={isUserRegistered ? <View /> : <Navigate to="/LoginUser" />}
        />
        <Route
          path="/create"
          element={isUserRegistered ? <Create /> : <Navigate to="/LoginUser" />}
        />
        <Route
          path="/edit/:id"
          element={isUserRegistered ? <EditTask /> : <Navigate to="/LoginUser" />}
        />
      </Routes>
    </Router>
  );
};