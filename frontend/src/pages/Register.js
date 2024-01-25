import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos'; // Import aos library

export default function RegisterForm() {
  const { addUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // call your useContext function
    addUser(formData.name, formData.email, formData.password, formData.confirmPassword);

    // Clear your form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
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
        <h2 className="text-center mb-4" data-aos="fade-up">
          Register/Sign Up
        </h2>
        <Form onSubmit={handleSubmit} data-aos="fade-up">
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3" data-aos="fade-up">
            Register
          </Button>
          <Container className="mt-3 mb-3">
            <Row>
              <Col className="text-start">
                <span style={{ fontSize: '0.9em' }}>
                  Already have an account?{' '}
                  <RouterLink to="/login" style={{ fontSize: '0.9em' }}>
                    Login here
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
