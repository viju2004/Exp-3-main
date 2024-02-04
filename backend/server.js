// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vijay',
  database: 'management', // Your database name
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('vijay'), // Replace 'password' with your actual MySQL password
  },
});


// Registration route
app.post('/api/register', (req, res) => {
  const { name, prnNumber, yearOfStudy, department, email, password } = req.body;

  // Validate inputs (you can use a validation library or custom logic)

  // Perform the database insert operation
  const query = `INSERT INTO student (name, prn_number, year_of_study, department, email, password) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, prnNumber, yearOfStudy, department, email, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ success: false, message: 'Registration failed' });
    }

    console.log('Registration successful!');
    return res.json({ success: true, message: 'Registration successful' });
  });
});


// Login route
app.post('/api/login', (req, res) => {
  const { prn, password } = req.body;

  // Perform the database select operation
  const query = `SELECT * FROM student WHERE prn_number = ? AND password = ?`;
  const values = [prn, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ success: false, message: 'Login failed' });
    }

    if (results.length > 0) {
      console.log('Login successful!');
      return res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Login failed. Invalid credentials.');
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Fetch all students route
app.get('/api/allStudents', async (req, res) => {
  try {
      const [rows, fields] = await db.promise().query('SELECT * FROM student');
      res.json(rows);
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
});

// Delete student route
app.delete('/api/deleteStudent/:id', async (req, res) => {
  const studentId = req.params.id;

  // Perform the database delete operation
  const query = `DELETE FROM student WHERE id = ?`;

  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error('Error during student deletion:', err);
      return res.status(500).json({ success: false, message: 'Deletion failed' });
    }

    if (result.affectedRows > 0) {
      console.log(`Student with ID ${studentId} deleted successfully!`);
      return res.json({ success: true, message: 'Deletion successful' });
    } else {
      console.log(`No student found with ID ${studentId}`);
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
  });
});

// Update student route
app.put('/api/updateStudent/:id', async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  try {
    // Perform the database update operation
    const query = `UPDATE student SET ? WHERE id = ?`;
    await db.promise().query(query, [updatedData, studentId]);

    console.log(`Updated student with id ${studentId}`);
    res.json({ success: true, message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Error updating student' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
