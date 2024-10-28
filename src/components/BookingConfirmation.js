import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accommodation, userName } = location.state || {}; // Extract accommodation and userName from location.state
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch booking details from the API
  const fetchBookingDetails = async () => {
    try {
      const response = await fetch('http://localhost:1000/bookings');
      const data = await response.json();

      // Find the booking details for the current user and accommodation
      const booking = data.find(
        (item) => item.name === userName && item.accommodation.id === accommodation.id
      );

      if (booking) {
        setBookingDetails(booking); // Set booking details state
      } else {
        setError('Booking not found');
      }
    } catch (err) {
      setError('Error fetching booking details');
    }
  };

  useEffect(() => {
    fetchBookingDetails(); // Fetch booking data when component mounts
  }, []);

  // Handle payment confirmation
  const handlePayment = () => {
    if (bookingDetails) {
      const confirmed = window.confirm(
        `Are you sure you want to process the payment through ${bookingDetails.paymentMethod}?`
      );
      if (confirmed) {
        alert(`Processing payment through ${bookingDetails.paymentMethod}...`);
        navigate('/'); // Navigate to home or a different page after payment
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Booking Confirmation</h2>
      {error && <p>{error}</p>}
      {accommodation && bookingDetails ? (
        <Card>
          <Card.Body>
            <Card.Title>Booking Details</Card.Title>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Accommodation:</strong> {accommodation.name}</p>
            <p><strong>Location:</strong> {accommodation.location}</p>
            <p><strong>Score:</strong> {accommodation.score}</p>
            <p><strong>Number Of Persons:</strong> {bookingDetails.persons}</p>
            <p><strong>Total Price:</strong> ₹{bookingDetails.totalPrice}</p>
            <Button variant="primary" onClick={handlePayment}>Pay Now</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>No booking details available.</p>
      )}
    </Container>
  );
};

export default BookingConfirmation;
