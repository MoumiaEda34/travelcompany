import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';

const PropertyDetails = () => {
  const { id } = useParams(); // Get the destination ID from the route
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [numberOfPersons, setNumberOfPersons] = useState(1); // State for number of persons
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const pricePerHead = 100; // Assume a fixed price per head (you can modify this)

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await fetch('http://localhost:1000/popularDestinations'); // Fetch popular destinations
        const data = await response.json();

        // Find the destination by ID from the fetched data
        const destinationData = data.find((dest) => dest.id === id);
        if (destinationData) {
          setDestination(destinationData);
        } else {
          setError('Destination not found');
        }
      } catch (err) {
        console.error('Failed to fetch destination data:', err);
        setError('Failed to fetch destination data. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchDestinationData();
  }, [id]);

  const handleNumberChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure at least 1 person
    setNumberOfPersons(value);
    setTotalPrice(value * pricePerHead); // Calculate total price
  };

  const handleReserve = () => {
    // Handle reserve logic here (e.g., show confirmation, save to database)
    alert(`Reserved for ${numberOfPersons} person(s). Total Price: $${totalPrice}`);
  };

  const handleBookNow = () => {
    // Handle booking logic here (e.g., navigate to payment, save booking)
    alert(`Booking confirmed for ${numberOfPersons} person(s). Total Price: $${totalPrice}`);
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading state while fetching the data
  }

  if (error) {
    return <p>{error}</p>; // Display any error that occurred during the fetch
  }

  return (
    <div>
      <h2>{destination.destination} - Properties</h2>
      <Row>
        {destination.propertyDetails.map((property) => (
          <Col md={6} key={property.propertyId}>
            <Card className="mb-4">
              {/* <Card.Img variant="top" src={property.image} alt={property.name} /> */}
              <Card.Body>
                <Card.Title>{property.name}</Card.Title>
                <Card.Text>{property.address}</Card.Text>
                <Card.Text>Rating: {property.rating}</Card.Text>
                {/* Additional property details can go here */}
                <Form.Group controlId="numberOfPersons">
                  <Form.Label>Number of Persons</Form.Label>
                  <Form.Control
                    type="number"
                    value={numberOfPersons}
                    onChange={handleNumberChange}
                    min={1}
                  />
                </Form.Group>
                <p>Total Price: ${totalPrice}</p>
                <Button variant="primary" onClick={handleReserve}>Reserve</Button>
                <Button variant="success" onClick={handleBookNow} className="ml-2">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PropertyDetails;
