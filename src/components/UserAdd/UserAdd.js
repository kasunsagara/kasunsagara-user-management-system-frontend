import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAdd.css';

function UserAdd() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users', { // Corrected backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          message: '',
        });

        window.alert("User added successfully");

      } else {
        const error = await response.json();
        window.alert(`Error: ${error.message}`);
      }
    } catch (err) {
      window.alert('Unable to connect to the server');
    }
  };

  return (
    <div className="user-add">
      <h1>Add a New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>

      <button onClick={() => navigate('/')} className="go-back-btn">
        Home
      </button>
      <button onClick={() => navigate('/display')} className="go-display-btn">
        View Users
      </button>
    </div>
  );
}

export default UserAdd;
