import React, { useState } from 'react';
import { Dropdown, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Offers.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
const Offers = () => {
   const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const handleHotelsClick = () => {
      navigate(`/accommodations`); // Navigate to PropertyDetails page with destination ID
    };
    
     // Toggle Dropdown
  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <Container>
      <h2>Exclusive Offers</h2>
      <p>Grab these amazing deals just for you!</p>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Explore the World</Card.Title>
              <Card.Text>
                Discover top destinations and book your next adventure.
              </Card.Text>
              <Button variant="primary" onClick={() => handleHotelsClick()}>
              Browse Hotels
                  </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='offer-body'>
          <Card>
            <Card.Img variant="top"/>
            <Card.Body className="offer-card-body"> {/* Added custom class */}
              <Card.Title>Limited Time Offer!</Card.Title>
              <Card.Text>
                Get up to 20% off when you book before the end of this month.
              </Card.Text>
              {/* <Button variant="primary">View Deals</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
       {/* Where are you going button and dropdown */}
       <div className="carousel-button">
          <Button variant="primary" size="lg" onClick={handleButtonClick}>
            Where are you going?
          </Button>
          {showDropdown && (
          <Dropdown className="location-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Popular Destinations Nearby
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Kolkata, India</Dropdown.Item>
              <Dropdown.Item>Digha, India</Dropdown.Item>
              <Dropdown.Item>Darjeeling, India</Dropdown.Item>
              <Dropdown.Item>Puri, India</Dropdown.Item>
              <Dropdown.Item>Mandarmoni, India</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        </div>
    </Container>
    
  );
};

export default Offers;
