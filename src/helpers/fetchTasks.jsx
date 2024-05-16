import React from 'react';

export const fetchTasks = async () => {
  const url = import.meta.env.VITE_ENLACE_COMPRAS;
  try {
    const datatype = await fetch(url);
    const data = await datatype.json();
    console.log(data);
    return { data };
  } catch (error) {
    console.error('Error al recoger los datos de tareas', error);
  }
};

export const deleteTask = async (taskId) => {
  const url = `${import.meta.env.VITE_ENLACE_COMPRAS}/${taskId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Tarea eliminada con ID: ', taskId);
    } else {
      console.error('Error al eliminar la tarea: ', response.status);
    }
  } catch (error) {
    console.error('Error al eliminar la tarea: ', error);
  }
};