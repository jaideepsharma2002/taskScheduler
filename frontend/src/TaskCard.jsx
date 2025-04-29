import React from 'react';
import './TaskCard.css';
import { Pencil, Trash2 } from 'lucide-react';

const TaskCard = ({ task, title, tag,datetime, desc, edit, delete: deleteTask, id }) => {
  const leftBorderColor = tag === 'note' ? '#52e673' : '#a579fe';

  let tag_to_display;

  if (tag==='reminder') {
    const localdatetime = new Date(datetime).toLocaleString();
    tag_to_display =`${tag} : ${localdatetime}`; }
  else {
    tag_to_display = tag;
  }

  return (
    <div className="task-card-wrapper" style={{ borderLeftColor: leftBorderColor }}>
      <div className="task-card-header">
        <h4 className="task-title">{title}</h4>
        <div className="task-actions">
          <Pencil className="icon-btn" onClick={() => edit(task)} />
          <Trash2 className="icon-btn delete-icon" onClick={() => deleteTask(id)} />
        </div>
      </div>
      <div className="task-card-content">
        <p className="task-desc">{desc}</p>
        <span className="task-tag">{tag_to_display}</span>
      </div>
    </div>
  );
};

export default TaskCard;
