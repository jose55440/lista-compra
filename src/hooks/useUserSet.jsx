import React from "react";
import { create } from "zustand";
import { fetchNewUser } from "../helpers/fetchNewUser";

export const useUserSet = create((set) => ({
  user: null, 
  setUser: (user) => set((state) => ({ ...state, user })), // Actualizamos el estado con el valor pasado como parámetro
  addUser: (newUser) => fetchNewUser(newUser),
}));