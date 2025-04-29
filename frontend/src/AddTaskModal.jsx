import React, { useEffect, useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ editopt,addopt, selectedTask, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('note');
  const [description,setDescription] = useState('');
  const [id, setId] = useState('');
  const [date,setDate] = useState('');
  const [hour,setHour] = useState('');
  const [minute,setMinute] = useState('');
  

  const [buttontitle,setButtonTitle] = useState("");

  const today = new Date().toISOString().split('T')[0];

  // console.log("selected task",selectedTask);

  useEffect( ()=>{

    if (editopt && selectedTask) {
      setTitle(selectedTask.title || '');
      setType(selectedTask.type || 'note');
      setDescription(selectedTask.description);
      setId(selectedTask._id);
      setButtonTitle("Edit Task"); }
    else {
      setTitle('');
      setType('note');
      setButtonTitle("Add Task");
    }

  },[editopt,addopt,selectedTask])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim()) {

        const token = localStorage.getItem("token");
        let utcDatetime;
        if (type==='reminder') {
        const localtime = new Date(`${date}T${hour.padStart(2,'0')}:${minute.padStart(2,'0')}:00`);
        utcDatetime = localtime.toISOString(); }
        const payload = {
          title,
          type,
          description,
          ...(type === 'reminder' && { datetime: utcDatetime }),
        };

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
            localStorage.setItem("task-update",Date.now().toString());
            onSubmit({ title, type });
            onClose();

        }
        catch(e) {
            console.log("error in creating the task");
        }
    }
  };

  const handleEditSubmit = async() => {

    const payload = {title, type};

    console.log("Edited task payload", payload,selectedTask);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/task/${id}`, {
        method:
        'PUT',
        'headers': { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to Update the tasks");
      }
      const updatedTask = await response.json()
      onSubmit(updatedTask);
      onClose();
    }
    catch(e) {
      console.log("Error in updating the task!");
    }
    
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {editopt && <h2 className="modal-title">Update Task</h2>}
        {addopt && <h2 className="modal-title">Add new Task</h2>}
        <input
          className="modal-input"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input className='modal-input'
        type='text'
        placeholder='Enter the description of task'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        <select
          className="modal-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={editopt}
        >
          
          <option value="note">Note</option>
          <option value="reminder">Reminder</option>
        </select>
        { type==='reminder' && (
        <div className="remainder-input">
        <label>Date:</label>
        <input
          type="date"
          className="date-input"
          value={date}
          min={today}
          required
          onChange={(e) => setDate(e.target.value)}
        />
      
        <div className="time-row">
          <div className="time-input-group">
            <label>Hour (0–23):</label>
            <input
              type="number"
              value={hour}
              min="0"
              max="23"
              required
              onChange={(e) => setHour(e.target.value)}
            />
          </div>
          <div className="time-input-group">
            <label>Minute (0–59):</label>
            <input
              type="number"
              value={minute}
              min="0"
              max="59"
              required
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>
        </div>
      </div>
      
        )}
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn submit" onClick={addopt ? handleSubmit:handleEditSubmit}>{buttontitle}</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
