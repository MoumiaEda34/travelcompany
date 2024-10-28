// src/components/PopularDestinations.js
import React, { useEffect, useState } from 'react';

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetching data from the local endpoint
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:1000/popularDestinations');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching popular destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="popular-destinations">
      <h2>Popular Destinations</h2>
      <div className="destination-list">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-item">
            <h3>{destination.destination}</h3>
            <img src={destination.image} alt={destination.destination} />
            <p>Properties: {destination.properties}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
