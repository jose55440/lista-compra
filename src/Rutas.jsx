import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { View } from './components/View';
import { Create } from './components/Create';
import { EditTask } from './components/EditTask';
import { NavBar } from './helper/NavBar';
 // Esto asegura que el efecto se ejecute cada vez que la lista de tareas cambie
import { LoginUser } from './components/LoginUser';
import { useUserSet } from './hooks/useUserSet';
import { checkIfUserIsRegistered } from './lib/TaskFunctions';
import { useTaskList } from './hooks/useTaskList';
import { fetchUsers } from './helpers/fetchUsers';
import {fetchTasks} from './helpers/fetchTasks'

export const Rutas = () => {
  const {user} = useUserSet();
  
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  useEffect(() => {
    // Verificar si el usuario está registrado
    setIsUserRegistered ( checkIfUserIsRegistered(user));
    
    // Ejecutar acciones en función del estado del usuario registrado
    if (isUserRegistered) {
      // Usuario registrado
      isUserRegistered
      user
      // Ejecutar otras acciones si es necesario
    } else {
      // Usuario no registrado
      isUserRegistered
      // Ejecutar otras acciones si es necesario
    }
  }, [user]);
     
  
  return (
    <Router>
      <NavBar />  
      <Routes>
        <Route path="/loginUser" element={<LoginUser />} />
        <Route
          path="/"
          element={isUserRegistered ? <View /> : <Navigate to="/loginUser" />}
        />
        <Route
          path="/create"
          element={isUserRegistered ? <Create /> : <Navigate to="/loginUser" />}
        />
        <Route
          path="/edit/:id"
          element={isUserRegistered ? <EditTask /> : <Navigate to="/loginUser" />}
        />
      </Routes>
    </Router>
  );
};