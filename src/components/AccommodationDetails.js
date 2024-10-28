import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AccommodationDetails = () => {
  const { location } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1000/accommodations/${location}`);
        if (!response.ok) {
          throw new Error('Failed to fetch accommodation details');
        }
        const data = await response.json();
        setAccommodation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationDetails();
  }, [location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{accommodation.name}</h2>
      <p><strong>Location:</strong> {accommodation.location}</p>
      <p><strong>Score:</strong> {accommodation.score}</p>
      <p><strong>Price:</strong> {accommodation.price}</p>
      {/* Add any additional accommodation details you want to show */}
    </div>
  );
};

export default AccommodationDetails;
