import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import houseLogo from '../images/house.png';

function CustomNavbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic or navigate to search results page as needed
    console.log('Search Query:', searchQuery);
  };

  return (
    <Navbar bg="info" variant="dark" expand="lg" style={{ marginBottom: '0px', height: '90px' }}>
      <Navbar.Brand as={Link} to="/">
        <img
          alt=""
          src={houseLogo}
          width="120"
          height="120"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
          <Nav.Link as={Link} to="/listings" className="text-dark">Listings</Nav.Link>
          <Nav.Link as={Link} to="/add-property" className="text-dark">Add Property</Nav.Link>
          <Nav.Link as={Link} to="/profile" className="text-dark">Profile</Nav.Link>
        </Nav>
        <Form className="d-flex me-auto align-items-center" onSubmit={handleSearch}>
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-dark" type="submit">
              Search
            </Button>
          </InputGroup>
        </Form>
        <Nav className="ml-auto">
          <Button variant="outline-dark" as={Link} to="/register" className="text-dark">Register</Button>
          <span className="mx-2"></span>
          <Button variant="outline-dark" as={Link} to="/login" className="text-dark ml-2">Login</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
