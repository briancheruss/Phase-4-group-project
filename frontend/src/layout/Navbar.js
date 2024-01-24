// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" style={{ marginTop: '3px' }} >
      <Navbar.Brand as={Link} to="/" className="text-light">Boma Homes</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
          <Nav.Link as={Link} to="/listings" className="text-light">Listings</Nav.Link>
          <Nav.Link as={Link} to="/add-property" className="text-light">Add Property</Nav.Link>
          <Nav.Link as={Link} to="/profile" className="text-light">Profile</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="outline-success" type="submit" className="me-3">Search</Button>
        </Form>
        <Button variant="outline-light" as={Link} to="/register" className="text-light me-2">Register</Button>
        <Button variant="outline-light" as={Link} to="/login" className="text-light me-2">Login</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
