import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to the User Management System</h1>
      <div className="button-container">
        <button onClick={() => navigate('/add')} className="nav-button">
          Add User
        </button>
        <button onClick={() => navigate('/display')} className="nav-button">
          View Users
        </button>
      </div>
    </div>
  );
}

export default Home;   