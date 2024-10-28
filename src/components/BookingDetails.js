import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const location = useLocation();
  const { accommodation, name, paymentMethod } = location.state || {};

  return (
    <div>
      <h2>Booking Details</h2>
      {accommodation ? (
        <div>
          <h3>Accommodation: {accommodation.name}</h3>
          <p><strong>Location:</strong> {accommodation.location}</p>
          <p><strong>Score:</strong> {accommodation.score}</p>
          <p><strong>Price:</strong> {accommodation.price}</p>
          <p><strong>Booked by:</strong> {name}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
        </div>
      ) : (
        <p>No booking details available.</p>
      )}
    </div>
  );
};

export default BookingDetails;
