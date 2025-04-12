import React from 'react';
import './TaskCard.css';
import { Pencil, Trash2 } from 'lucide-react';

const TaskCard = ({ title, tag, onEdit, onDelete }) => {
  const borderColor = tag === "note" ? "#52e673" : "#a579fe";

  return (
    <div className="task-card-wrapper" style={{ borderColor }}>
      <div className="task-card-header">
        <Pencil className="icon-btn" onClick={onEdit} />
        <Trash2 className="icon-btn delete-icon" onClick={onDelete} />
      </div>
      <div className="task-card-content">
        <span className="task-tag">{tag}</span>
        <h4 className="task-title">{title}</h4>
      </div>
    </div>
  );
};

export default TaskCard;
