import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserUpdate.css";

function UserUpdate() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { firstName } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${firstName}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.list[0]); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || "User not found");
        }
      } catch (err) {
        setError("Unable to fetch user data");
      }
    };

    fetchUser();
  }, [firstName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/users/${firstName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/display");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update user");
      }
    } catch (err) {
      setError("Unable to update user");
    }
  };

  return (
    <div className="update-user">
      <h1>Update User</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
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
            value={user.lastName}
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
            value={user.emailAddress}
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
            value={user.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={user.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UserUpdate;
