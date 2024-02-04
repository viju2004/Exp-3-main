// src/components/RegistrationPage.js

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/Registration.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [department, setDepartment] = useState('');
  const [prnNumber, setPrnNumber] = useState('');

  const handleRegistration = () => {
    // Make a POST request to the registration API endpoint
    axios.post('http://localhost:5000/api/register', {
      name,
      prnNumber,
      yearOfStudy,
      department,
      email,
      password,
    })
    .then(response => {
      console.log(response.data);
      if (response.data.success) {
        // Handle successful registration (redirect, show success message, etc.)
        console.log('Registration successful!');
      } else {
        // Handle registration failure
        console.error(response.data.message);
      }
    })
    .catch(error => {
      // Handle network errors or other issues
      console.error('Error during registration:', error.message);
    });
  };
  

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        PRN Number:
        <input type="text" value={prnNumber} onChange={(e) => setPrnNumber(e.target.value)} />
      </label>
      <label>
        Year of Study:
        <input type="text" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} />
      </label>
      <label>
        Department:
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export { RegistrationPage };
