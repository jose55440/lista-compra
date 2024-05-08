import React from "react";

export const fetchUsers = async () => {
  try {
    let url = import.meta.env.VITE_ENLACE_USERS;
    const datatype = await fetch(url);
    const data = await datatype.json();
    return { data };
  } catch (error) {
    console.error("Error con usuarios:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por quien llame a la función
  }
};
