import React, { useState } from 'react';
import { useTaskList } from '../hooks/useTaskList';

export const EditTask = ({ taskId }) => {
  const { tasks, editTask } = useTaskList();
  const [taskName, setTaskName] = useState(tasks.find((task) => task.id === taskId).name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { id: taskId, name: taskName, completed: tasks.find((task) => task.id === taskId).completed };
    editTask(taskId, updatedTask);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};