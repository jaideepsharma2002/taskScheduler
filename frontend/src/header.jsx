import React from 'react';
import './header.css';

const Header = ({logout}) => {
  return (
    <header className="header">
      <h2>Task Manager</h2>
      <button className='logout-button' onClick={logout}>Logout</button>
    </header>
  );
};  

export default Header;