// PasswordForm.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos';

const PasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle the email and password for forgot password
    onSubmit({ email, password });
  };

  // Initialize aos when the component mounts
  AOS.init({
    duration: 1500,
    easing: 'ease-in-out',
  });

  return (
    <Card className="mx-auto mt-5" data-aos="fade-up" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Forgot Password</h2>
        <Form onSubmit={handleSubmit} data-aos="fade-up">
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" data-aos="fade-up" className="w-100 mt-3 mb-3">
            Change Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PasswordForm;
