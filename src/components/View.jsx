import React, { useEffect, useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { Task } from "./Task";
import { Create } from "./Create";
import { motion } from "framer-motion";
import { useUserSet } from "../hooks/useUserSet";
import { fetchTasks } from "../helpers/fetchTasks";
import '../stylesheets/View.css'
import { Button } from "@mui/material";

export const View = ({ isLoggedIn, onLogout }) => {
  const { removeTask, toComplete, editTask } = useTaskList();
  const { user } = useUserSet();
  const [purchase, setPurchase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTasks();
      if (data) {
        setPurchase(data);
      }
    };

    fetchData();
  }, []);

  const handleRemoveTask = (taskId) => {
    removeTask(taskId);
    setPurchase((prevPurchase) => prevPurchase.filter((task) => task.id !== taskId));
  };

  const handleToComplete = (taskId) => {
    toComplete(taskId);
    setPurchase((prevPurchase) =>
      prevPurchase.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (taskId, updatedTask) => {
    editTask(taskId, updatedTask);
    setPurchase((prevPurchase) =>
      prevPurchase.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
      {isLoggedIn && <Button variant="outlined" color="error" onClick={onLogout}>Cerrar sesión</Button>}
        <Create setPurchase={setPurchase} />
       

        {purchase.map((task) => {
          if (task.idUser === user.id) {
            return (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                completed={task.completed}
                removeTask={handleRemoveTask}
                toComplete={handleToComplete}
                editTask={handleEditTask}
              />
            );
          }
          return null;
        })}
      </div>
    </motion.div>
  );
};