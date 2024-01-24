import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/property/${id}`);
        const data = await response.json();
        setProperty(data[0]);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      {property ? (
        <div>
          <h2>{property.name}</h2>
          <img
            src={property.image}
            alt={property.name}
            style={{ maxWidth: '100%', marginBottom: '20px', border: '1px solid #ddd' }}
          />
          <p>
            <strong>Address:</strong> {property.address}
            <br />
            <strong>Price:</strong> ${property.price}
            <br />
            <strong>Description:</strong> {property.description}
          </p>

          <h3>Reviews</h3>
          {property.reviews.length > 0 ? (
            <ul>
              {property.reviews.map(review => (
                <li key={review.id}>
                  <p>
                    <strong>Review:</strong> {review.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PropertyDetails;
