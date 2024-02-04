import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';
import DataDisplay from './DataDisplay';

const StudentTable = ({ studentsData }) => (
    <div className="admin-section">
        <h2>All Students</h2>
        {/* Placeholder for existing user data or additional user management features */}
        <DataDisplay endpoint="/allStudents" />
    </div>
);

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState('allStudents');
    const [studentsData, setStudentsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the server when the component mounts
        fetch('/api/allStudents')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setStudentsData(data.students);
                } else {
                    console.error(`Error fetching students data: ${data.message}`);
                }
            })
            .catch((error) => {
                console.error('Error during data fetching:', error);
            });
    }, []);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handleLogout = () => {
        console.log('Logout');
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div className="admin-page">
            <header>
                <div className="profile-picture">
                    {/* Placeholder for admin profile picture */}
                    <img src="stud.jpg" alt="admin"></img>
                </div>
                <h1>Welcome, Admin!</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <nav>
                <ul>
                    <li
                        className={selectedTab === 'userManagement' ? 'active' : ''}
                        onClick={() => handleTabChange('userManagement')}
                    >
                        User Management
                    </li>
                    <li
                        className={selectedTab === 'courseManagement' ? 'active' : ''}
                        onClick={() => handleTabChange('courseManagement')}
                    >
                        Course Management
                    </li>
                    <li
                        className={selectedTab === 'allStudents' ? 'active' : ''}
                        onClick={() => handleTabChange('allStudents')}
                    >
                        All Students
                    </li>
                    {/* Add more tabs for different functionalities */}
                </ul>
            </nav>

            <main>
                {selectedTab === 'userManagement' && (
                    <div className="admin-section">
                        <h2>User Management</h2>
                        {/* Placeholder for user management component */}
                        <p>User management features will go here.</p>
                    </div>
                )}

                {selectedTab === 'courseManagement' && (
                    <div className="admin-section">
                        <h2>Course Management</h2>
                        {/* Placeholder for course management component */}
                        <p>Course management features will go here.</p>
                    </div>
                )}

                {selectedTab === 'allStudents' && <StudentTable studentsData={studentsData} />}

                {/* Add more sections for other functionalities */}
            </main>

            <footer>
                <p>&copy; 2024 Student Portal</p>
            </footer>
        </div>
    );
};

export { AdminPage };
