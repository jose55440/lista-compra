import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { Toaster, toast } from "sonner";
import "../stylesheets/Task.css";
import { useTaskList } from '../hooks/useTaskList';
import { EditTask } from './EditTask';
import { motion } from "framer-motion";

export const Task = ({ id, name, completed }) => {
  const { removeTask, editTask, toComplete } = useTaskList();
  const [showEditTask, setShowEditTask] = useState(false);
  const [taskName, setTaskName] = useState(name);

  const handleEdit = () => {
    setShowEditTask(true);
  };

  const handleSaveEdit = (updatedTask) => {
    editTask(id, updatedTask);
    setShowEditTask(false);
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="confirmation-message">
        <div className="confirmation-message-text">{`¿Estás seguro de borrar la tarea "${name}"?`}</div>
        <button
          className="confirmation-button confirm-button"
          onClick={() => {
            toast.dismiss(t.id, { duration: 200 });
            removeTask(id);
          }}
        >
          Sí
        </button>
        <button
          className="confirmation-button cancel-button"
          onClick={() => toast.dismiss(t.id, { duration: 200 })}
        >
          Cancelar
        </button>
      </div>
    ));
  };

  const handleToggleComplete = () => {
    toComplete(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={completed ? "contenedor-tarea completado" : "contenedor-tarea"}
    >
      {name}
      <div className="botones">
        <div className="tarea-icono-editar" onClick={handleEdit}>
          <CiEdit />
        </div>
        {showEditTask && <EditTask taskId={id} taskName={taskName} setTaskName={setTaskName} onSave={handleSaveEdit} />}
        <div className="tarea-icono-editar" onClick={handleDelete}>
          <AiTwotoneDelete />
        </div>
        <div className="tarea-icono-completado" onClick={handleToggleComplete}>
          {completed ? "✔️" : "❌"}
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
};