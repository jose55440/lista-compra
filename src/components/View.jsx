import React, { useEffect, useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { Task } from "./Task";
import { Create } from "./Create";
import { motion } from "framer-motion";
import { useUserSet } from "../hooks/useUserSet";
import { fetchTasks } from "../helpers/fetchTasks";

export const View =  () => {
  const {removeTask,toComplete} = useTaskList()
  const {user} = useUserSet();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTasks();
      setData(result.data);
    };

    fetchData();
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Create />
  
        {data.map((task) => {
          if (task.idUser === user.id) {
            return (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                completed={task.completed}
                removeTask={removeTask}
                toComplete={toComplete}
              />
            );
          }
          return null; // Return null if condition is not met
        })}
      </div>
    </motion.div>
  );
  
};