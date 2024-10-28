import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, Modal,Container } from 'react-bootstrap'; // Ensure Bootstrap is installed
import './booking-list.css';
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set items per page for pagination
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to store the selected booking

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUserName(loggedInUser.name);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:1000/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        const userBookings = data.filter(booking => booking.name === userName);
        setBookings(userBookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userName]);

  const handlePayment = (paymentMethod) => {
    const confirmed = window.confirm(`Are you sure you want to process the payment through ${paymentMethod}?`);
    if (confirmed) {
      alert(`Processing payment through ${paymentMethod}...`);
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to withdraw this booking?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:1000/bookings/${bookingId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Logic for pagination
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentBookings = bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null); // Clear selected booking
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
    <div>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Hotel</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.accommodation.name}</td>
                  <td>{booking.status || 'Reserved'}</td>
                  <td>{booking.paymentMethod}</td>
                  <td>
                    <Button variant="info" onClick={() => handleShowDetails(booking)}>View Details</Button>
                    <Button variant="primary" onClick={() => handlePayment(booking.paymentMethod)}>Pay</Button>
                    <Button variant="danger" onClick={() => handleDelete(booking.id)}>Withdraw</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Component */}
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item 
                key={index + 1} 
                active={index + 1 === currentPage} 
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {/* Booking Details Modal */}
          <Modal show={showDetailsModal} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedBooking && (
                <div>
                  <p><strong>Name:</strong> {selectedBooking.name}</p>
                  <p><strong>Hotel:</strong> {selectedBooking.accommodation.name}</p>
                  <p><strong>Location:</strong> {selectedBooking.accommodation.location}</p>
                  <p><strong>Room Type:</strong> {selectedBooking.accommodation.roomType}</p>
                  <p><strong>Bed Type:</strong> {selectedBooking.accommodation.bedType}</p>
                  <p><strong>Price:</strong> {selectedBooking.accommodation.price}</p>
                  <p><strong>Status:</strong> {selectedBooking.status || 'Reserved'}</p>
                  <p><strong>Payment Method:</strong> {selectedBooking.paymentMethod}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetails}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>No bookings found for {userName}.</p>
      )}
    </div>
    </Container>
  );
};

export default BookingList;
