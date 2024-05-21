import React from 'react';

export const fetchTasks = async () => {
  const url = import.meta.env.VITE_ENLACE_COMPRAS;
  try {
    const datatype = await fetch(url);
    const data = await datatype.json();
    
    return { data };
  } catch (error) {
    console.error('Error al recoger los datos de tareas', error);
  }
};

export const deleteTask = async (taskId) => {
  const url = import.meta.env.VITE_ENLACE_COMPRAS;
  const { data } = await fetchTasks();
  const updatedData = data.filter((task) => task.id !== taskId);
  const datosJSON = JSON.stringify(updatedData);

  try {
    const datatype = await fetch(url, {
      method: "PUT",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await datatype.json();
    

   

    console.log('Tarea eliminada :', taskId);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
  }
};
