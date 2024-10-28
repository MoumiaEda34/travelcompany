import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaUser, FaBed, FaCalendarAlt } from 'react-icons/fa';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log({ destination, checkInDate, checkOutDate, guests });
  };

  return (
    <Form onSubmit={handleSearch} className="search-bar">
      <Row className="align-items-center">
        <Col md={4}>
          <Form.Group controlId="destination">
            <FaBed className="me-2" />
            <Form.Control
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="checkInOut">
            <FaCalendarAlt className="me-2" />
            <Form.Control
              type="text"
              placeholder="Check-in Date"
              onFocus={(e) => (e.target.type = 'date')}
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Check-out Date"
              onFocus={(e) => (e.target.type = 'date')}
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="guests">
            <FaUser className="me-2" />
            <Form.Control
              as="select"
              value={`${guests.adults} adults · ${guests.children} children · ${guests.rooms} room`}
              onChange={(e) => setGuests({ ...guests, adults: 2, children: 0, rooms: 1 })}
            >
              <option>2 adults · 0 children · 1 room</option>
              <option>1 adult · 1 child · 1 room</option>
              <option>2 adults · 1 child · 1 room</option>
              {/ Add more options as needed /}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
