import React from 'react'

export const View = () => {
  return (
    <MagicMotion>
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
    </MagicMotion>
  );
};
