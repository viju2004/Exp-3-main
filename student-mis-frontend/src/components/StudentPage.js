import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Update import to useNavigate
import axios from 'axios';
import '../styles/Student.css';

const StudentPage = () => {
    const [studentData, setStudentData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Replace useHistory with useNavigate

    useEffect(() => {
        // Simulate fetching student data from the server after login
        // Replace '123' with the actual logged-in student's ID or unique identifier
        const studentId = 123;

        // Simulated student data
        const dummyStudentData = {
            name: 'Vijay Mali',
            prnNumber: '22520008',
            email: 'vijay1172004@gmail.com',
            // Add more dummy data as needed
        };

        // Simulate a delay to mimic a real API request
        const delay = setTimeout(() => {
            setStudentData(dummyStudentData);
            setLoading(false);
        }, 1000); // Simulating a 1-second delay

        return () => clearTimeout(delay); // Cleanup on component unmount
    }, []);

    const handleLogout = () => {
        // Add your logout logic here (clear authentication, etc.)
        // For now, let's simulate a logout by navigating to the homepage
        navigate('/');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="student-page">
            <header>
                <h1>Welcome, {studentData.name}!</h1>
            </header>

            <div className="dashboard">
                {/* Display dashboard content, such as upcoming events, recent grades, etc. */}
                {/* Customize this section based on your specific dashboard requirements */}
                <h2>Dashboard</h2>
                {/* Add dashboard components here */}
            </div>

            <div className="profile-section">
                <h2>Profile Information</h2>
                <p>Name: {studentData.name}</p>
                <p>PRN: {studentData.prnNumber}</p>
                <p>Email: {studentData.email}</p>
                {/* Add more profile information as needed */}
                <Link to="/update-profile">Update Profile</Link>
            </div>

            <div className="academic-section">
                <h2>Academic Information</h2>
                <p><strong>Year of Study:</strong> {studentData.yearOfStudy || 'Third Year'}</p>
                <p><strong>Department:</strong> {studentData.department || 'CSE'}</p>
                <p><strong>GPA:</strong> {studentData.gpa || '6'}</p>
                {/* Add more academic details as needed */}
            </div>

            <button onClick={handleLogout}>Logout</button>

            {}
        </div>
    );
};

export { StudentPage };
