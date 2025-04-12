import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('note');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim()) {

        const token = localStorage.getItem("token");
        const payload = {title, type};

        console.log("Sending data to backend to store", payload);

        try {
            const response = await fetch('http://localhost:5000/api/task/createtask', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();
            onSubmit({ title, type });
            onClose();

        }
        catch(e) {
            console.log("error in creating the task");
        }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Add New Task</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="modal-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="note">Note</option>
          <option value="reminder">Reminder</option>
        </select>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn submit" onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
