import React from 'react'
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "../stylesheets/Task.css";
import { useTaskList } from '../hooks/useTaskList';
import { EditTask } from './EditTask';

export const Task = ({ id, name, completed, removeTask }) => {
  const { toComplete } = useTaskList();
  const [showEditTask, setShowEditTask] = React.useState(false);

  const procesarBorrado = () => {
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

  return (
    <div
      className={
        completed ? "contenedor-tarea completado" : "contenedor-tarea"
      }
    >
      {name}
      <div className="botones">
        <div className="tarea-icono-editar" onClick={() => setShowEditTask(!showEditTask)}>
          <CiEdit />
        </div>
        {showEditTask && <EditTask taskId={id} />}
        <div className="tarea-icono-editar" onClick={procesarBorrado}>
          <AiTwotoneDelete />
        </div>
        <div className="tarea-icono-completado" onClick={() => toComplete(id)}>
          {completed ? "✔️" : "❌"}
        </div>
      </div>
      <Toaster />
    </div>
  )
}