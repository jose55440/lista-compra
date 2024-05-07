import React from "react";
import { fetchUsers } from "./fetchUsers";

export const fetchNewUser = async (newUser) => {
  async function peticion() {
    const url = import.meta.env.VITE_ENLACE_USERS;
    let { data } = await fetchUsers();
    const newUserJson= JSON.parse(newUser)
    const datosJSON = [...data, newUserJson];
    
    const datatype = await fetch(url, {
      method: "PUT",
      body: datosJSON,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await datatype.json();
    return {response};
  }
  try{
  return await peticion();
  }catch(error){
    console.log('Error al añadir usuario:', error);
    throw error;
  }
};
