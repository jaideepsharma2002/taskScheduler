import React, {useEffect, useState} from 'react';
import Header from './header';
import Sidebar from './Sidebar';
import TaskCard from './TaskCard';
import './TaskPage.css';
import AddTaskModal from './AddTaskModal';

const TaskPage = () => {

    const [tasks, setTasks] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (task) => {
      setTasks([...tasks, task]);
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async() => {

        try {

            const token = localStorage.getItem("token");

            console.log("task page token", token);

            const response = await fetch("http://localhost:5000/api/task/gettask", {
                method: 'GET',
                headers :{ 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);

        console.log("task data", data);

        }
        catch(e) {

            setError(e.message);

        }
        finally {
            setLoading(false);
        }
    };


    useEffect( ()=>{
        
    fetchTasks();

    },[]);

  return (
    <div className="task-page">
      <Header />
      <div className="main-layout">
        <Sidebar onAddTaskClick={() => setIsModalOpen(true)} />
        <div className="task-board">
          <h3>Tasks</h3>
          {loading && <p>Loading tasks</p>}
          {error && <p className='error'>{error}</p>}
          {!loading && !error && tasks.map(task => (
            <TaskCard key={task._id} title={task.title} tag={task.type} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskPage;
