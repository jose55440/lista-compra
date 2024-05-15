import React from "react";
import { fetchTasks } from "./fetchTasks";
import { useTaskList } from "../hooks/useTaskList";

export const fetchNewTask = (newTasks) => {
  async function peticion() {
    const url = import.meta.env.VITE_ENLACE_COMPRAS;
    
    let datosJSON;
    
    datosJSON = await newTasks;
    console.log(newTasks)
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