import React from "react";
import { useTaskList } from "../hooks/useTaskList";
import { Task } from "./Task";
import { Create } from "./Create";
import { MagicMotion } from "react-magic-motion";

export const View = () => {
  const { tasks, removeTask, toComplete } = useTaskList();

  return (
    
      <div>
        <MagicMotion>
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
        </MagicMotion>
      </div>
    
  );
};
