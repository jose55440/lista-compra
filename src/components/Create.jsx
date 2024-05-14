import React, { useState } from 'react';
import { useTaskList } from '../hooks/useTaskList';
import { v4 as uuidv4 } from 'uuid';
import { useUserSet } from '../hooks/useUserSet';


export const Create = () => {
  const { addTask } = useTaskList();
  const {user} = useUserSet();
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Evita agregar una tarea vacía

    const newTask = {
      id: uuidv4(),
      name: input,
      completed: false,
      idUser: user.id
    };
    console.log(newTask)
    addTask(newTask); // Agrega la nueva tarea al estado
    setInput(''); // Limpia el campo de entrada después de agregar la tarea
    
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
