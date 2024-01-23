// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Real Estate</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/listings">Listings</Nav.Link>
          <Nav.Link as={Link} to="/add-property">Add Property</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="outline-success" type="submit" className="me-3">Search</Button>
        </Form>
        <Button variant="outline-light" as={Link} to="/register" className="me-2 ">Register</Button>
        <Button variant="outline-light" as={Link} to="/login" className="me-2">Login</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
