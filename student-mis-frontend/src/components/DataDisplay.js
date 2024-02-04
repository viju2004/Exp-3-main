import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    prn_number: '',
    year_of_study: '',
    department: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api${endpoint}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [endpoint]);

  const handleUpdate = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setSelectedItem(selectedItem);

    // Populate the form data with the selected item's values
    setUpdateFormData({
      name: selectedItem.name,
      prn_number: selectedItem.prn_number,
      year_of_study: selectedItem.year_of_study,
      department: selectedItem.department,
      email: selectedItem.email,
    });
  };

  const handleUpdateFormChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the student data
      await axios.put(`http://localhost:5000/api/updateStudent/${selectedItem.id}`, updateFormData);

      // Refresh the data after updating
      const response = await axios.get(`http://localhost:5000/api${endpoint}`);
      setData(response.data);

      // Reset the form data and selected item after updating
      setUpdateFormData({
        name: '',
        prn_number: '',
        year_of_study: '',
        department: '',
        email: '',
      });
      setSelectedItem(null);

      alert(`Updated student with id ${selectedItem.id}`);
    } catch (error) {
      alert('Error updating student:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the server to delete the student
      await axios.delete(`http://localhost:5000/api/deleteStudent/${id}`);

      // Update the state by filtering out the deleted student
      setData((prevData) => prevData.filter((student) => student.id !== id));

      console.log(`Deleted student with id ${id}`);
    } catch (error) {
      console.error('Error deleting student:', error.message);
    }
  };

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>PRN</th>
              <th>Year of Study</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.prn_number}</td>
                <td>{item.year_of_study}</td>
                <td>{item.department}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleUpdate(item.id)}>Update</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}

      {/* Update Form */}
      {selectedItem && (
        <form onSubmit={handleUpdateSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={updateFormData.name} onChange={handleUpdateFormChange} />
          </label>
          <label>
            PRN:
            <input type="text" name="prn_number" value={updateFormData.prn_number} onChange={handleUpdateFormChange} />
          </label>
          <label>
            Year of Study:
            <input type="text" name="year_of_study" value={updateFormData.year_of_study} onChange={handleUpdateFormChange} />
          </label>
          <label>
            Department:
            <input type="text" name="department" value={updateFormData.department} onChange={handleUpdateFormChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" value={updateFormData.email} onChange={handleUpdateFormChange} />
          </label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default DataDisplay;
