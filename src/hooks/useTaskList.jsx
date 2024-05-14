import React from 'react';
import { create } from 'zustand';
import {  editTask, toComplete } from '../lib/TaskFunctions';
import { v4 as uuidv4 } from 'uuid';
import { fetchNewTask } from '../helpers/fetchNewTask';


export const useTaskList = create((set) => ({
  tasks: [],
  setTasks:(tasks) => set((state) => ({ ...state, tasks })),
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  addTaskToBase: (newTask) => fetchNewTask(newTask),
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  
  editTask: (taskId, updatedTask) => set((state) => ({ tasks: editTask(taskId, state.tasks, updatedTask) })),
  toComplete: (taskId) => set((state) => ({ tasks: toComplete(taskId, state.tasks) })),
}));