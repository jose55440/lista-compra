import React, { useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { v4 as uuidv4 } from "uuid";
import { fetchUsers } from "../helpers/fetchUsers";
export const LoginUser = () => {
  const {  setUser, addUser } = useTaskList();
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const searchUser = async () => {
    try {
      const usersData = await fetchUsers();
      
      const foundUser = usersData.find((user) => user.name === input);
      console.log(foundUser)
      if (foundUser) {
        setUser(foundUser);
        return true
      }else{
        return false
      } 

    } catch (error) {
      console.log("Error al conseguir los usuarios");
      return false
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Evita agregar una tarea vacía
    let newUser = {
      id: uuidv4(),
      name: input,
    };
    let foundUser=await searchUser();
    console.log(foundUser)
    if (!foundUser) {
      addUser(newUser);
      setUser(newUser);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        id="text"
        value={input}
        onChange={handleInput}
        placeholder="Ingrese una nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
};
