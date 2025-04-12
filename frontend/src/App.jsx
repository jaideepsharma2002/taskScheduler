import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login'
import Signup from './signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskPage from './TaskPage'
import ProtectedRoute from './reuseable'



function App() {

  return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          <Route path='/task' element={
            <ProtectedRoute>
            <TaskPage/>
            </ProtectedRoute>
            }></Route>
        </Routes>
      </Router>
  );
}

export default App;
