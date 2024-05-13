import React from "react";
import { create } from "zustand";
import { fetchNewUser } from "../helpers/fetchNewUser";

export const useUserSet = create((set) => ({
  user: {}, 
  setUser: (state,newUser) => set(state.user=newUser ), // Actualizamos el estado con el valor pasado como parámetro
  addUser: (newUser) => fetchNewUser(newUser),
}));