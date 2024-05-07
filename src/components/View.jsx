import React from 'react'

export const View = () => {
  return (
    
      <div>
        <Create />
        <MagicMotion>
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
