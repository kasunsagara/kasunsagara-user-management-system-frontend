import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDisplay.css";

function UserDisplay() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.list);
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message}`);
        }
      } catch (err) {
        setError("Unable to connect to the server");
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (firstName) => {
    navigate(`/update/${firstName}`); 
  };

  const handleDelete = async (firstName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${firstName}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setUsers(users.filter((user) => user.firstName !== firstName));
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message}`);
        }
      } catch (err) {
        setError("Unable to connect to the server");
      }
    }
  };

  const handleGoBack = () => {
    navigate("/"); 
  };

  return (
    <div className="user-display">
      <h1>Users List</h1>
      {error && <p className="error-message">{error}</p>}
      {users.length === 0 && !error ? (
        <p>No users found</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.emailAddress}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.message}</td>
                <td>
                  <button onClick={() => handleUpdate(user.firstName)} className="update-btn">
                    Update
                  </button>
                  <button onClick={() => handleDelete(user.firstName)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleGoBack} className="go-back-btn">
        Home
      </button>
    </div>
  );
}

export default UserDisplay;
