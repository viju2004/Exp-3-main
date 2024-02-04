// src/components/StudentPage.js

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/Login.css';

const LoginPage = () => {
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Make a POST request to the login API endpoint
    axios.post('http://localhost:5000/api/login', {
      prn,
      password,
    })
    .then(response => {
      console.log(response.data);
      if (response.data.success) {
        // Handle successful login (redirect, set user session, etc.)
        navigate('/student');
        alert('Login successful!');
      } else {
        // Handle login failure
        console.error(response.data.message);
      }
    })
    .catch(error => {
      // Handle network errors or other issues
      console.error('Error during login:', error.message);
    });
  };

  return (
    <div className="login-page">
      <header>
        <h1>Welcome to Student Portal</h1>
      </header>

      <div className="login-container">
        <h2>Login</h2>
        <label>
          PRN:
          <input type="text" value={prn} onChange={(e) => setPrn(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>

        {/* Clickable text for account registration */}
        <p>
          Don't have an account?{' '}
          <Link to="/Registration" className="registration-link">
            Register here
          </Link>
        </p>
      </div>

      <footer>
        <p>&copy; 2024 Student Portal</p>
      </footer>
    </div>
  );
};

export { LoginPage };
