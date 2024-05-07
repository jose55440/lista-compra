import { create } from 'zustand';
import { firestore } from './firebase';
import firebase from 'firebase/app';

export const useTaskList = create((set, get) => ({
  tasks: [],
  addTask: async (newTask) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        await userRef.update({
          tasks: firebase.firestore.FieldValue.arrayUnion(newTask)
        });
        const updatedTasks = await getUserTasks(currentUser.uid);
        set({ tasks: updatedTasks });
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  },
  removeTask: async (taskId) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        const taskToRemove = get().tasks.find((task) => task.id === taskId);
        await userRef.update({
          tasks: firebase.firestore.FieldValue.arrayRemove(taskToRemove)
        });
        const updatedTasks = await getUserTasks(currentUser.uid);
        set({ tasks: updatedTasks });
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  },
  editTask: async (taskId, updatedTask) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        const taskIndex = get().tasks.findIndex((task) => task.id === taskId);
        const updatedTasks = [...get().tasks];
        updatedTasks[taskIndex] = updatedTask;
        await userRef.update({
          tasks: updatedTasks
        });
        set({ tasks: updatedTasks });
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al editar la tarea:', error);
    }
  },
  toComplete: async (taskId) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        const taskIndex = get().tasks.findIndex((task) => task.id === taskId);
        const updatedTasks = [...get().tasks];
        updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
        await userRef.update({
          tasks: updatedTasks
        });
        set({ tasks: updatedTasks });
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al completar la tarea:', error);
    }
  }
}));

const getUserTasks = async (userId) => {
  try {
    const userDoc = await firestore.collection('users').doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data().tasks || [];
    } else {
      console.error('Usuario no encontrado');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las tareas del usuario:', error);
    return [];