import React from "react";
import { useTaskList } from "../hooks/useTaskList";
import { Task } from "./Task";
import { Create } from "./Create";
import { motion } from "framer-motion";

export const View = () => {
  const {tasks,removeTask,toComplete} = useTaskList()
  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Create />

        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            removeTask={removeTask}
            toComplete={toComplete}
          />
        ))}
      </div>
    </motion.div>
  );
};
