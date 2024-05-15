import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { View } from './components/View';
import { Create } from './components/Create';
import { EditTask } from './components/EditTask';
import { NavBar } from './helper/NavBar';
import { LoginUser } from './components/LoginUser';
import { useUserSet } from './hooks/useUserSet';
import { checkIfUserIsRegistered } from './lib/TaskFunctions';
import { useTaskList } from './hooks/useTaskList';
import { fetchUsers } from './helpers/fetchUsers';
import { fetchTasks } from './helpers/fetchTasks';

export const Rutas = () => {
  const { user, setUser } = useUserSet();
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserRegistered(checkIfUserIsRegistered(user));
  }, [user]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/loginUser" element={<LoginUser onLogin={handleLogin} />} />
        <Route
          path="/"
          element={isLoggedIn ? <View /> : <Navigate to="/loginUser" />}
        />
        <Route
          path="/create"
          element={isLoggedIn ? <Create /> : <Navigate to="/loginUser" />}
        />
        <Route
          path="/edit/:id"
          element={isLoggedIn ? <EditTask /> : <Navigate to="/loginUser" />}
        />
      </Routes>
    </Router>
  );
};