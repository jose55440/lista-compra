import React from "react";
import { fetchTasks } from "./fetchTasks";

export const fetchNewTask = (newTask) => {
  async function peticion() {
    const url = import.meta.env.VITE_ENLACE_COMPRAS;
    const { data } = await fetchTasks();
    let datosJSON;
    if (data != null) {
      datosJSON = [...data, newTask];
    } else {
      datosJSON = [newTask];
    }

    datosJSON = JSON.stringify(datosJSON);

    const datatype = await fetch(url, {
      method: "PUT",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await datatype.json();
    console.log(response);
  }

  try {
    return peticion();
  } catch (error) {
    console.log("Error al añadir tarea:", error);
    throw error;
  }
};

export const editTaskInDB = async (taskId, updatedTask) => {
  const url = import.meta.env.VITE_ENLACE_COMPRAS;
  const { data } = await fetchTasks();
  const updatedData = data.map((task) =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
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
    console.log(response);
  } catch (error) {
    console.error("Error al editar la tarea: ", error);
  }
};

export const completeTaskInDB = async (taskId) => {
  const url = import.meta.env.VITE_ENLACE_COMPRAS;
  const { data } = await fetchTasks();
  const updatedData = data.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
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
    console.log(response);
    return updatedData.find((task) => task.id === taskId);
  } catch (error) {
    console.error("Error al marcar/desmarcar la tarea: ", error);
  }
};
