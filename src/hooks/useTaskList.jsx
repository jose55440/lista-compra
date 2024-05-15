import { create } from 'zustand';
import { editTask, toComplete } from '../lib/TaskFunctions';
import { v4 as uuidv4 } from 'uuid';
import { fetchNewTask } from '../helpers/fetchNewTask';
import { useUserSet } from './useUserSet';
import { fetchTasks } from '../helpers/fetchTasks';

export const useTaskList = create((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set((state) => ({ ...state, tasks: tasks.filter((task) => task.idUser === get().user?.id) })),
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  addTaskToBase: (newTask) => fetchNewTask(newTask),
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  editTask: (taskId, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    }));
  },
  toComplete: (taskId) => set((state) => ({ tasks: toComplete(taskId, state.tasks) })),
  fetchTasksFromDB: async () => {
    const { data } = await fetchTasks();
    set((state) => ({ ...state, tasks: data.filter((task) => task.idUser === get().user?.id) }));
  },
}), (get, set) => ({
  user: useUserSet((state) => state.user),
}));