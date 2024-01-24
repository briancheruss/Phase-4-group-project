import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos'; // Import aos library
import { Link as RouterLink } from 'react-router-dom';

export default function LoginForm() {
  const { login } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // call your useContext function
    login(username, password);

    // Clear your form
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    // Initialize aos when the component mounts
    AOS.init({
      duration: 1500, // Set the animation duration
      easing: 'ease-in-out', // Set the animation easing
    });
  }, []);

  return (
    <Card className="mx-auto mt-5" data-aos="fade-up" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit} data-aos="fade-up">
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" data-aos="fade-up" className="w-100 mt-3">
            Login
          </Button>

          <Container className="mt-3">
            <Row>
              <Col>
                <RouterLink to="/forgot-password" style={{ fontSize: '0.9em' }}>
                  Forgot Password?
                </RouterLink>
              </Col>
              <Col className="text-end">
                <span style={{ fontSize: '0.9em' }}>
                  Don't have an account?{' '}
                  <RouterLink to="/register" style={{ fontSize: '0.9em' }}>
                    Register here
                  </RouterLink>
                </span>
              </Col>
            </Row>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}
