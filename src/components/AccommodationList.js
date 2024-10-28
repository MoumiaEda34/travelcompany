import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AccommodationList.css';

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', paymentMethod: '', userId: '', persons: 1, totalPrice: 0 });
  const [user, setUser] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  // Fetch accommodations from the JSON server
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('http://localhost:1000/accommodations');
        if (!response.ok) {
          throw new Error('Failed to fetch accommodations');
        }
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Retrieve the logged-in user from localStorage
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setBookingData(prevData => ({
        ...prevData,
        name: loggedInUser.name,
        userId: loggedInUser.id
      }));
    }
  }, []);

  // Handle accommodation selection and show modal
  const handleAddToCart = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccommodation(null);
  };

  const handleBookingDataChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Calculate total price based on the number of persons
    if (name === 'persons') {
      const totalPrice = selectedAccommodation.price * value;
      setBookingData(prevData => ({
        ...prevData,
        totalPrice: totalPrice
      }));
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user || !bookingData.name) {
      alert("You need to sign in first");
      return;
    }

    try {
      const response = await fetch('http://localhost:1000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          accommodation: selectedAccommodation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      navigate('/booking-confirmation', { state: { accommodation: selectedAccommodation, userName: user.name } });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  // Filter accommodations based on search location
  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="accommodation-list">
      <h2>Plan Your Stay</h2>
      <Form.Control
        type="text"
        placeholder="Search by location..."
        value={searchLocation}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="accommodation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccommodations.map((accommodation) => (
            <tr key={accommodation.id}>
              <td>{accommodation.name}</td>
              <td>{accommodation.location}</td>
              <td>{accommodation.score}</td>
              <td>{accommodation.price}</td>
              <td>
                <Button variant="primary" onClick={() => handleAddToCart(accommodation)}>Reserve</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Accommodation Details and Booking Form */}
      {selectedAccommodation && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Accommodation Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Accommodation Details</h5>
            <p><strong>Name:</strong> {selectedAccommodation.name}</p>
            <p><strong>Location:</strong> {selectedAccommodation.location}</p>
            <p><strong>Score:</strong> {selectedAccommodation.score}</p>
            <p><strong>Price:</strong> {selectedAccommodation.price}</p>
            <p><strong>Booked By:</strong> {user ? user.name : 'Guest'}</p>
            <hr />
            <Form onSubmit={handleBookingSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={bookingData.name}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formPersons">
                <Form.Label>Number of Persons</Form.Label>
                <Form.Control
                  type="number"
                  name="persons"
                  value={bookingData.persons}
                  onChange={handleBookingDataChange}
                  min="1"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTotalPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="text"
                  value={bookingData.totalPrice}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMethod"
                  value={bookingData.paymentMethod}
                  onChange={handleBookingDataChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash">Cash</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Confirm Booking
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AccommodationList;
