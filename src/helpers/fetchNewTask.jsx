import React from "react";
import { fetchTasks } from "./fetchTasks";
import { useTaskList } from "../hooks/useTaskList";

export const fetchNewTask = (newTask) => {
  async function peticion() {
    const url = import.meta.env.VITE_ENLACE_COMPRAS;
    const {data} = await fetchTasks();
    let datosJSON;
    if (data!=null){
      datosJSON = [...data,newTask];
    }else{
      datosJSON = [newTask]
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
