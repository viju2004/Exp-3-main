// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import { Student, LoginPage } from './components/Login';
import { RegistrationPage } from './components/RegistrationPage';
import { FacultyPage } from './components/FacultyPage ';
import { AdminPage } from './components/AdminPage';
import { StudentPage } from './components/StudentPage';
// import StudentPage from './pages/StudentPage';
// import FacultyPage from './pages/FacultyPage';
// import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Registration" element={<RegistrationPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
