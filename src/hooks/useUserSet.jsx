import React from "react";
import { create } from "zustand";
import { fetchNewUser } from "../helpers/fetchNewUser";

export const useUserSet = create((set) => ({
  user: null, 
  setUser: (userTest) => set({ user: userTest }), // Actualizamos el estado directamente con el nuevo valor
  addUser: (newUser) => fetchNewUser(newUser),
}));