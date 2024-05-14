

export const editTask = (id, tasks, updatedTask) => {
  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      return updatedTask;
    }
    return task;
  });
  return newTasks;
}

export const toComplete = (id, tasks) => {
  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  return newTasks;
}



export const checkIfUserIsRegistered = (user) => {
  // Aquí debes implementar la lógica para verificar si el usuario está registrado
  // Por ejemplo, podrías verificar si el usuario tiene un ID válido u otro criterio
  // Retorna true si el usuario está registrado, false en caso contrario
  return user !== null && user !== undefined;
};
