import React, { useState, useEffect } from 'react';
import { Carousel, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaUser, FaBed, FaCalendarAlt } from 'react-icons/fa';
import tajmahal from '../assets/images/tajmahal.jpg';
import darjeeling from '../assets/images/darjeeling.jpg';
import maldives from '../assets/images/maldives.jpg';
import kolkata from '../assets/images/kolkata.jpg';
import bengaluru from '../assets/images/bengaluru.jpg';
import mumbai from '../assets/images/mumbai.jpg';
import Offers from './Offers';
import { saveSearchData } from '../api/searchApi';
import { fetchPopularDestinations } from '../api/destinationApi'; // Import the new function
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [popularDestinations, setPopularDestinations] = useState([]); // State for popular destinations

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await fetchPopularDestinations();
        setPopularDestinations(data);
      } catch (error) {
        console.error('Failed to fetch popular destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!destination || !checkInDate || !checkOutDate) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }

    const searchData = {
      destination,
      checkInDate,
      checkOutDate,
      guests,
    };

    try {
      await saveSearchData(searchData);
      console.log('Search saved:', searchData);
      setSuccess('Search saved successfully!');
      setError('');
      setDestination('');
      setCheckInDate('');
      setCheckOutDate('');
      setGuests({
        adults: 2,
        children: 0,
        rooms: 1,
      });
    } catch (error) {
      console.error('Failed to save search data:', error);
      setError('Failed to save search data. Please try again.');
      setSuccess('');
    }
  };

  const handleDestinationClick = (id) => {
    navigate(`/property-details/${id}`); // Navigate to PropertyDetails page with destination ID
  };
  

  return (
    <div className="home-page">
      {/* Image Carousel */}
      <div className="slider-banner">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={kolkata} alt="First slide" />
            <Carousel.Caption>
              <h3>Kolkata: The Cultural Capital of India</h3>
              <p>Explore the City of Joy, where history, art, and culinary delights await.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={mumbai} alt="Second slide" />
            <Carousel.Caption>
              <h3>Mumbai: The City That Never Sleeps</h3>
              <p>Experience the vibrant energy of India’s financial hub and Bollywood’s heart..</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={bengaluru} alt="Third slide" />
            <Carousel.Caption>
              <h3>Bengaluru: The Silicon Valley of India</h3>
              <p>Discover the tech capital renowned for its innovation, gardens, and cosmopolitan lifestyle</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Search Bar Section */}
      <Form onSubmit={handleSearch} className="search-bar">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
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
      <div className="recommended-destinations">
        <h2>Recommended</h2>
        <Row>     
            <Col md={4} key={destination.destination}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Kolkata</Card.Title>
                  <img className="d-block w-100" src={kolkata} alt="kolkata" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} key={destination.destination}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Mumbai</Card.Title>
                  <img className="d-block w-100" src={mumbai} alt="mumbai" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} key={destination.destination}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Bengaluru</Card.Title>
                  <img className="d-block w-100" src={bengaluru} alt="bengaluru" />
                </Card.Body>
              </Card>
            </Col>
        </Row>
      </div>
      {/* Popular Destinations Section */}
      <div className="popular-destinations">
        <h2>Explore India</h2>
        <p>These popular destinations have a lot to offer:</p>
        <Row>
          {popularDestinations.map((destination) => (
            <Col md={4} key={destination.destination}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{destination.destination}</Card.Title>
                  <Card.Text>{destination.properties} properties available</Card.Text>
                  <Button variant="primary" onClick={() => handleDestinationClick(destination.id)}>
                    View Products
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Offers />
    </div>
  );
};

export default Home;
