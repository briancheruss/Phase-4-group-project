import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos'; // Import aos library
import { Link as RouterLink } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Initialize aos when the component mounts
    AOS.init({
      duration: 1500, // Set the animation duration
      easing: 'ease-in-out', // Set the animation easing
    });
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login data:', formData);
  };

  return (
    <Card className="mx-auto mt-5" data-aos="fade-up" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit} data-aos="fade-up">
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
};

export default LoginForm;
