import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Form, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [updatedProperty, setUpdatedProperty] = useState({
    name: '',
    address: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/property/${id}`);
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

  const handleAddReview = async () => {
    try {
      const response = await fetch('/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review_text: newReview,
          property_id: id,
        }),
      });

      if (response.ok) {
        const updatedResponse = await fetch(`/property/${id}`);
        const updatedData = await updatedResponse.json();
        setProperty(updatedData[0]);
        setNewReview('');

        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Review added successfully.',
          icon: 'success',
        });
      } else {
        console.error('Failed to add review:', response.statusText);
        // Show error message
        Swal.fire({
          title: 'Error',
          text: 'Failed to add review.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedResponse = await fetch(`/property/${id}`);
        const updatedData = await updatedResponse.json();
        setProperty(updatedData[0]);

        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Review deleted successfully.',
          icon: 'success',
        });
      } else {
        console.error('Failed to delete review:', response.statusText);
        // Show error message
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete review.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdateProperty = async () => {
    try {
      const response = await fetch(`/property/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (response.ok) {
        const updatedResponse = await fetch(`/property/${id}`);
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
      const response = await fetch(`/property/${id}`, {
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

  return (
    <div style={{ margin: '20px' }}>
      {property ? (
        <Card>
          <Card.Body>
            <Card.Title>{property.name}</Card.Title>
            <Card.Img variant="top" src={property.image} alt={property.name} />
            <Card.Text>
              <strong>Address:</strong> {property.address}
              <br />
              <strong>Price:</strong> ${property.price}
              <br />
              <strong>Description:</strong> {property.description}
            </Card.Text>

            {/* Add Review Form */}
            <div style={{ marginBottom: '20px' }}>
              <h4>Add a Review</h4>
              <Form>
                <Form.Group controlId="newReview">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleAddReview}>
                  Add Review
                </Button>
              </Form>
            </div>

            <Card.Title>Reviews</Card.Title>
            {property.reviews.length > 0 ? (
              <Col xs={12}>
                {property.reviews.map((review) => (
                  <Card key={review.id} style={{ marginBottom: '10px' }}>
                    <Card.Body>
                      <Card.Text>
                        <strong>Review:</strong> {review.body}
                      </Card.Text>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Delete Review
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            ) : (
              <p>No reviews available.</p>
            )}

            {/* Update Property Form */}
            <div style={{ marginBottom: '20px' }}>
              <h4>Update Property Details</h4>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedProperty.name}
                    onChange={(e) => setUpdatedProperty({ ...updatedProperty, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedProperty.address}
                    onChange={(e) => setUpdatedProperty({ ...updatedProperty, address: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedProperty.price}
                    onChange={(e) => setUpdatedProperty({ ...updatedProperty, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={updatedProperty.description}
                    onChange={(

e) => setUpdatedProperty({ ...updatedProperty, description: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdateProperty}>
                  Update Property
                </Button>
              </Form>
            </div>

            {/* Delete Property Button */}
            <Button variant="danger" onClick={handleDeleteProperty}>
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
