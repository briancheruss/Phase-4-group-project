import React, { useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    image: '',
    name: '',
    address: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data here if needed

    // Show loading or processing message
    Swal.fire({
      title: 'Processing...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Make API call to add property
      const response = await fetch('https://real-estate-ue1j.onrender.com/add_property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        // Close loading message
        Swal.close();

        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Property added successfully.',
          icon: 'success',
        });

        // Redirect to PropertyListings page
        navigate('/listings');
      } else {
        // Handle error scenario
        throw new Error('Failed to add property');
      }
    } catch (error) {
      // Handle any exception
      console.error('Error adding property:', error);
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred.',
        icon: 'error',
      });
    }
  };

  return (
    <Container>
      <h2>Add Property</h2>
      <Form onSubmit={handleSubmit}>
        <Col xs={12} md={6}>
          <Form.Group controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Button variant="primary" type="submit">
          Add Property
        </Button>
      </Form>
    </Container>
  );
}

export default AddProperty;
