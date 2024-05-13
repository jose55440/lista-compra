import React from "react";
import { create } from "zustand";
import { fetchNewUser } from "../helpers/fetchNewUser";
export const useUserSet = create((set) => ({
  user: {},
  setUser: (userTest) => set((user) => ({ user: userTest })),
  addUser: (newUser) => fetchNewUser(newUser),
}));
