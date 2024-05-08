import React from "react";
import { fetchUsers } from "./fetchUsers";
import { useState } from "react";

export const fetchNewUser = async (newUser) => {

  async function peticion() {
   
    const url = import.meta.env.VITE_ENLACE_USERS;
    let { data } = await fetchUsers();
    let datosJSON;
    if (data != null) {
      datosJSON = [...data,newUser];
    } else {
      
      datosJSON = [newUser];
    }
    datosJSON = JSON.stringify(datosJSON);

    console.log(datosJSON);
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
    console.log("Error al añadir usuario:", error);
    throw error;
  }
};
