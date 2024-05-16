import React from 'react';

export const EditTask = ({ taskId, taskName, setTaskName, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { id: taskId, name: taskName };
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};