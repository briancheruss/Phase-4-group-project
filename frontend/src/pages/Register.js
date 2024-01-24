import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos'; // Import aos library



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Initialize aos when the component mounts
    AOS.init({
      duration: 1500, // Set the animation duration
      easing: 'ease-in-out', // Set the animation easing
    });
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <Card className="mx-auto mt-5" data-aos="fade-up" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4"data-aos="fade-up">Register/Sign Up</h2>
        <Form onSubmit={handleSubmit} data-aos="fade-up">
          <Form.Group controlId="formUsername"className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail"className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword"className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword"className="mb-3">
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
};

export default RegisterForm;
