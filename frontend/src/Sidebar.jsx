import React from 'react';
import './Sidebar.css';

const Sidebar = ({onAddTaskClick}) => {
  return (
    <div className="sidebar">
      <button className="add-task-btn" onClick={onAddTaskClick}>+ Add Task</button>
    </div>
  );
};

export default Sidebar;