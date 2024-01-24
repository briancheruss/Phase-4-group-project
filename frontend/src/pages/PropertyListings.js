import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PropertyListings() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/property'); // Replace with your actual backend URL
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Property Listings</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {properties.map((property) => (
          <Col key={property.id}>
            <Card style={{ height: '400px', overflow: 'hidden', marginBottom: '20px' }}>
              <Card.Img
                variant="top"
                src={property.image}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body style={{ height: '200px' }}>
                <Card.Title>{property.name}</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> {property.address}
                  <br />
                  <strong>Price:</strong> ${property.price}
                </Card.Text>
                <Link to={`/listings/${property.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PropertyListings;
