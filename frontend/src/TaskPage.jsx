import React, {use, useEffect, useState} from 'react';
import Header from './header';
import Sidebar from './Sidebar';
import TaskCard from './TaskCard';
import './TaskPage.css';
import AddTaskModal from './AddTaskModal';

const TaskPage = () => {

    const [tasks, setTasks] = useState([]);

    const [selectedtask,setSelectedTask] = useState({});


    const [editTask,setEditTask] = useState(false);
    const [addTask,setAddTask] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (task) => {

      console.log("edited task",task,editTask);

      if (editTask) {
        setTasks((prevTasks) => {
          return prevTasks.map((t) =>
            t._id === task._id ? { ...t, ...task } : t // This will update the task with the matching ID
          );
        });

        
      }
      else 
      setTasks([...tasks, task]);
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const onEdit = async(task) => {
      setEditTask(true);
      setAddTask(false);
      setIsModalOpen(true);
      setSelectedTask(task);
    }

    const onDelete = async(id) => {

      console.log("Delete id",id);

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:5000/api/task/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to delete the task!");
        }

        setTasks( (prevTasks) => {
          return prevTasks.filter(opt => opt._id !== id);
        })

        console.log("delete res", response);

      }
      catch(e) {

        console.log(`error in deleting the taks! ${e}`);
      }
    }

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
        <Sidebar onAddTaskClick={() => {setIsModalOpen(true)
                                        setAddTask(true)
                                        setEditTask(false)}} />
        <div className="task-board">
          <h3>Tasks</h3>
          {loading && <p>Loading tasks</p>}
          {error && <p className='error'>{error}</p>}
          {!loading && !error && tasks.map(task => (
            <TaskCard task={task} id={task._id} key={task._id} title={task.title} tag={task.type} edit={onEdit} delete={onDelete} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <AddTaskModal
          editopt = {editTask}
          addopt = {addTask}
          selectedTask={selectedtask} 
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskPage;
