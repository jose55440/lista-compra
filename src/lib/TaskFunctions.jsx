export const viewTask = () => {
  return (
    <div>Task</div>
  )
}

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
