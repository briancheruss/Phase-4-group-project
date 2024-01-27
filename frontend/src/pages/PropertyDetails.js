import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Form, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [updatedProperty, setUpdatedProperty] = useState({
    name: '',
    address: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`https://real-estate-ue1j.onrender.com/property/${id}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setProperty(data[0]);
          setUpdatedProperty({
            name: data[0].name,
            address: data[0].address,
            price: data[0].price,
            description: data[0].description,
          });
        } else {
          console.error('Invalid property data:', data);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);


  const handleUpdateProperty = async () => {
    try {
      const response = await fetch(`https://real-estate-ue1j.onrender.com/property/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (response.ok) {
        const updatedResponse = await fetch(`https://real-estate-ue1j.onrender.com/property/${id}`);
        const updatedData = await updatedResponse.json();
        setProperty(updatedData[0]);

        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Property details updated successfully.',
          icon: 'success',
        });
      } else {
        console.error('Failed to update property:', response.statusText);
        // Show error message
        Swal.fire({
          title: 'Error',
          text: 'Failed to update property details.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleDeleteProperty = async () => {
    try {
      const response = await fetch(`https://real-estate-ue1j.onrender.com/property/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirect to property listings or another page after deletion
        Swal.fire({
          title: 'Success!',
          text: 'Property deleted successfully.',
          icon: 'success',
        });
      } else {
        console.error('Failed to delete property:', response.statusText);
        // Show error message
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete property.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  // Smaller-width forms
  const formStyle = { maxWidth: '300px', margin: 'auto', marginLeft: 0 };

  return (
    <div style={{ margin: '0px', marginTop: '0px' }}>
      {property ? (
        <Card>
          <Card.Body>
            <Card.Title>{property.name}</Card.Title>
            <Card.Img variant="top" src={property.image} alt={property.name} />
            <div style={{ margin: '30px' }}></div>
            <Card.Text>
              <strong>Address:</strong> {property.address}
              <br />
              <strong>Price:</strong> ${property.price}
              <br />
              <strong>Description:</strong> {property.description}
            </Card.Text>


            {/* Update Property Form */}
            <div style={{ ...formStyle, marginBottom: '20px', maxWidth: '600px' }}>
              <h4>Update Property Details</h4>
              <Form>
                <Col xs={12}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      value={updatedProperty.name}
                      onChange={(e) => setUpdatedProperty({ ...updatedProperty, name: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="address">
                    <Form.Control
                      type="text"
                      value={updatedProperty.address}
                      onChange={(e) => setUpdatedProperty({ ...updatedProperty, address: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="price">
                    <Form.Control
                      type="text"
                      value={updatedProperty.price}
                      onChange={(e) => setUpdatedProperty({ ...updatedProperty, price: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="description">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={updatedProperty.description}
                      onChange={(e) => setUpdatedProperty({ ...updatedProperty, description: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Button variant="primary" style={{ ...formStyle, marginTop: '10px' }} onClick={handleUpdateProperty}>
                  Update Property
                </Button>
              </Form>
            </div>

            {/* Delete Property Button */}
            <Button variant="danger" style={{ ...formStyle, marginTop: '20px' }} onClick={handleDeleteProperty}>
              Delete Property
            </Button>

          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PropertyDetails;
