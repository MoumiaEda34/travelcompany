import React, { useEffect, useState } from 'react';
import './User.css'; // Optional: For additional styling
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:1000/users'); // Ensure this matches your server path
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await fetch(`http://localhost:1000/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handlePopupSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = { ...selectedUser };

    try {
      const response = await fetch(`http://localhost:1000/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      alert('User updated successfully!'); // Show success alert
      await fetchUsers(); // Refetch users after updating
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user'); // Show error alert
    } finally {
      setShowPopup(false);
      setSelectedUser(null);

      // Perform logout actions after user update and navigate to login page
      localStorage.removeItem('token'); // Adjust this line based on your implementation
      navigate('/user'); // Navigate to the login page
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Handle file change for profile image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedUser({ ...selectedUser, profileImage: imageUrl });
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Logic for pagination
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Profile Image</th> {/* Add profile image column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                {user.profileImage && (
                  <img src={user.profileImage} alt="Profile" width="50" height="50" />
                )}
              </td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEditClick(user)}>Update User</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(user.id)}>Remove User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit User</h3>
            <form onSubmit={handlePopupSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={selectedUser.name} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={selectedUser.email} onChange={handleInputChange} required />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={selectedUser.password} onChange={handleInputChange} required />
              </label>
              <label>
                Profile Image:
                <input type="file" name="profileImage" onChange={handleFileChange} />
              </label>
              {selectedUser.profileImage && (
                <div>
                  <img src={selectedUser.profileImage} alt="Profile Preview" width="100" />
                </div>
              )}
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default User;
