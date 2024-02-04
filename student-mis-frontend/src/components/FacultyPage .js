// src/components/FacultyPage.js

import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../styles/Faculty.css';
// import profileImage from '../public/student.jpg';

const FacultyPage = () => {

  const navigate = useNavigate();
  // Updated placeholder data for courses
  const courses = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      schedule: 'Mon/Wed/Fri 10:00 AM - 11:30 AM',
      enrolledStudents: [
        { id: 101, name: 'John Doe' },
        { id: 102, name: 'Jane Smith' },
        // Add more students as needed
      ],
    },
    {
      id: 2,
      name: 'Database Management',
      schedule: 'Tue/Thu 2:00 PM - 3:30 PM',
      enrolledStudents: [
        { id: 103, name: 'Bob Johnson' },
        { id: 104, name: 'Alice Williams' },
        // Add more students as needed
      ],
    },
    {
      id: 3,
      name: 'Software Engineering',
      schedule: 'Mon/Wed 1:00 PM - 2:30 PM',
      enrolledStudents: [
        { id: 105, name: 'Charlie Brown' },
        { id: 106, name: 'Lucy Miller' },
        // Add more students as needed
      ],
    },
    // Add more courses as needed
  ];

  const handleLogout = () => {
    // Perform logout actions (clear session, redirect, etc.)
    // navigate('/');
    console.log('Logging out...');
    // Example: Redirect to the login page after logout
    // You can replace '/login' with the actual path of your login page
    window.location.href = '/';
  };

  // Updated placeholder data for tasks
  const tasks = [
    { id: 1, description: 'Create midterm exam for Database Management' },
    { id: 2, description: 'Review assignments for Introduction to Computer Science' },
    { id: 3, description: 'Prepare lecture slides for Software Engineering' },
    { id: 4, description: 'Grade final projects for Database Management' },
    { id: 5, description: 'Hold office hours for student consultations' },
    // Add more tasks as needed
  ];

  return (
    <div className="faculty-page">
      <header>
        <div className="profile-picture">
          <img src='faculty.png' alt='faculty'></img>
        </div>
        <h1>Welcome, Faculty Member!</h1>

        {/* Logout button */}
        <Link to="#" onClick={handleLogout} className="logout-button">
          Logout
        </Link>
      </header>

      <div className="faculty-container">
        <section className="courses-section">
          <h2>My Courses</h2>
          <div className="cards-container">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <p>Schedule: {course.schedule}</p>
                <p>Enrolled Students:</p>
                <ul>
                  {course.enrolledStudents.map((student) => (
                    <li key={student.id}>{student.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="tasks-section">
          <h2>Tasks</h2>
          <div className="cards-container">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <p>&copy; 2024 Student Portal</p>
      </footer>
    </div>
  );
};

export { FacultyPage };
