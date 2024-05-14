import React from 'react'

export const fetchTasks = async () => {
    const url=import.meta.env.VITE_ENLACE_COMPRAS
    try{
    const datatype= await fetch(url);
    const data= await datatype.json()
    console.log(data)
     return {data}
    }catch(error){
        console.error('Error al recoger los datos de tareas',error)
    }
  
  
  
}
