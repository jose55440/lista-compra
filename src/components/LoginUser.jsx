import React, { useState } from "react";
import { useUserSet } from "../hooks/useUserSet";
import { v4 as uuidv4 } from "uuid";
import { fetchUsers } from "../helpers/fetchUsers";
import { useNavigate } from 'react-router-dom';

export const LoginUser = ({ onLogin }) => {
  const { user, setUser, addUser } = useUserSet();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const searchUser = async () => {
    try {
      const { data } = await fetchUsers();

      let userFound = false;

      data.forEach(user => {
        if (user.name === input) {
          setUser(user);
          userFound = true; // Usuario encontrado, establece userFound en true y detén la iteración
        }
      });

      return userFound; // Devuelve el estado de userFound
    } catch (error) {
      console.log("Error al conseguir los usuarios:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Evita agregar una tarea vacía
    let newUser = {
      id: uuidv4(),
      name: input,
    };
    let foundUser = await searchUser();

    if (foundUser === false) {
      addUser(newUser);
      setUser(newUser);
    }

    onLogin(); // Llamar a la función onLogin después de iniciar sesión correctamente
    navigate('/'); // Redirigir a la vista principal después de iniciar sesión
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        id="text"
        value={input}
        onChange={handleInput}
        placeholder="Ingrese usuario"
      />
      {/* {JSON.stringify(user)} */}
      <button type="submit">Agregar</button>
    </form>
  );
};
