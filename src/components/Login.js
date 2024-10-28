import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add a separate CSS file for custom styles

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulated login logic - replace this with your actual API call to fetch user data
    const response = await fetch('http://localhost:1000/users'); // Adjust the endpoint as necessary
    const users = await response.json();

    const loggedInUser = users.find(user => user.email === email && user.password === password); // Adjust password check as needed

    if (loggedInUser) {
      localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store the entire user object
      setUser(loggedInUser); // Update user state in App.js
      navigate('/'); // Redirect to home after login
    } else {
      setError('Invalid credentials!'); // Set error message for invalid login attempt
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="shadow p-4 bg-white rounded">
          <h2 className="text-center">Sign In</h2>

          {error && <Alert variant="danger">{error}</Alert>} {/* Error alert for invalid login */}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            <div className="text-center mt-3">
              <small>
                Don't have an account? 
                <a href="/register"> Register</a>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
