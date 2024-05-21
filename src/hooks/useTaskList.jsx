import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { fetchNewTask, editTaskInDB, completeTaskInDB } from '../helpers/fetchNewTask';
import { useUserSet } from './useUserSet';
import { fetchTasks, deleteTask } from '../helpers/fetchTasks';

export const useTaskList = create((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks: tasks.filter((task) => task.idUser === get().user?.id) }),

  addTask: async (newTask) => {
    await fetchNewTask(newTask);
    
    set((state) => ({ tasks: [...state.tasks, newTask] }));
    await get().fetchTasksFromDB();
  },

  removeTask: async (taskId) => {
    await deleteTask(taskId);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) }));
    await get().fetchTasksFromDB();
  },

  editTask: async (taskId, updatedTask) => {
    await editTaskInDB(taskId, updatedTask);
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)),
    }));
    await get().fetchTasksFromDB();
  },

  toComplete: async (taskId) => {
    await completeTaskInDB(taskId);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true, completedAt: new Date() } : task
      ),
    }));
    await get().fetchTasksFromDB();
  },

  fetchTasksFromDB: async () => {
    const { data } = await fetchTasks();
    set({ tasks: data.filter((task) => task.idUser === get().user?.id) });
  },

  startTaskPolling: () => {
    const pollingInterval = 5000; // Consultar cada 5 segundos
    const pollingTimer = setInterval(async () => {
      await get().fetchTasksFromDB();
    }, pollingInterval);

    // Limpiar el temporizador cuando el componente se desmonte o el usuario cierre sesión
    return () => clearInterval(pollingTimer);
  },
}), (get, set) => ({
  user: useUserSet((state) => state.user),
}));
