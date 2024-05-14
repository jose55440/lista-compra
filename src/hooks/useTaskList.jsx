import React from 'react';
import { create } from 'zustand';
import { viewTask, editTask, toComplete } from '../lib/TaskFunctions';
import { v4 as uuidv4 } from 'uuid';


export const useTaskList = create((set) => ({
  tasks: [{
    id: uuidv4(),
    name: 'Tarea 1',
    completed: false,
    idUser:'b4c05146-a5d8-4c0c-969b-bc53feffbb7c'
  },
  {
    id: uuidv4(),
    name: 'Tarea 2',
    completed: true,
    idUser:'b4c05146-a5d8-4c0c-969b-bc53feffbb7c'
  },
],
  
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  viewTask: (taskId) => viewTask(taskId),
  editTask: (taskId, updatedTask) => set((state) => ({ tasks: editTask(taskId, state.tasks, updatedTask) })),
  toComplete: (taskId) => set((state) => ({ tasks: toComplete(taskId, state.tasks) })),
}));