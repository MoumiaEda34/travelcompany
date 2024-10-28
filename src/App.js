import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Image, Modal, Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Offers from './components/Offers';
import Footer from './layout/Footer'; 
import './App.css';
import User from './components/User';
import AccommodationList from './components/AccommodationList';
import AccommodationDetails from './components/AccommodationDetails';
import BookingConfirmation from './components/BookingConfirmation';
import BookingList from './components/BookingList';
import PropertyDetails from './components/PropertyDetails';
import PopularDestinations from './components/PopularDestinations';
function App() {
  const [user, setUser] = useState(null);
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [updatedName, setUpdatedName] = useState('');
  const [updatedProfileImage, setUpdatedProfileImage] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setUpdatedName(loggedInUser.name); // Set initial name in modal
      setUpdatedProfileImage(loggedInUser.profileImage); // Set initial profile image in modal
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleUserSelection = (image) => {
    setSelectedUserImage(image);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleUpdateProfile = () => {
    const updatedUser = {
      ...user,
      name: updatedName,
      profileImage: updatedProfileImage,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user to local storage
    setUser(updatedUser); // Update user state
    handleCloseModal(); // Close modal after update
  };

  return (
    <Router>
      <Navbar style={{ backgroundColor: 'rgb(9 24 48)' }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Travel.com</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              {/* <Nav.Link as={Link} to="/login">Sign in</Nav.Link> */}
              <Nav.Link as={Link} to="/offers">Exclusive Offer</Nav.Link>
              <Nav.Link as={Link} to="/user">User</Nav.Link>
              <Nav.Link as={Link} to="/accommodations">Hotels</Nav.Link>
              <Nav.Link as={Link} to="/booking-list">Booking Details</Nav.Link>
            </Nav>

            {user ? (
              <Nav>
                <Nav.Item className="d-flex align-items-center">
                  <span
                    style={{ color: 'white', marginRight: '10px', cursor: 'pointer' }}
                    onClick={handleShowModal} // Show modal on name click
                  >
                    {user.name} {/* Display user's name */}
                  </span>
                  {/* <button onClick={handleShowModal} style={{ marginRight: '10px' }}>
                    Update profile
                  </button> */}
                  <Image
                    src={user.profileImage}
                    roundedCircle
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  />
                  <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/accommodations" element={<AccommodationList />} />
          <Route path="/accommodations/:location" element={<AccommodationDetails />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/booking-list" element={<BookingList />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/popular-destinations" element={<PopularDestinations />} />
          <Route 
            path="/user" 
            element={<User userImageHandler={handleUserSelection} />} 
          />
        </Routes>

        {selectedUserImage && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4>Selected User Profile Image</h4>
            <Image src={selectedUserImage} alt="Selected User" width="100" height="100" roundedCircle />
          </div>
        )}

        {/* User Update Profile Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  value={updatedName} 
                  onChange={(e) => setUpdatedName(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formBasicProfileImage">
                <Form.Label>Profile Image URL</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter profile image URL" 
                  value={updatedProfileImage} 
                  onChange={(e) => setUpdatedProfileImage(e.target.value)} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateProfile}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
