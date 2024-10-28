// src/components/Footer.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Assuming you will add styles in this file

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-col">
            <h5>About Us</h5>
            <p>We are dedicated to providing the best travel experiences.</p>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Contact Us</h5>
            <p>Email: support@travelcompany.com</p>
            <p>Phone: +91 6296168624</p>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Follow Us</h5>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Travel Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
