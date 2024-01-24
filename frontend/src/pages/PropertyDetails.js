import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/property/${id}`);
        const data = await response.json();
        console.log('Fetched property details:', data);
  
        if (data && data.length > 0) {
          setProperty(data[0]);
        } else {
          console.error('Invalid property data:', data);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
  
    fetchPropertyDetails();
  }, [id]);
  
  useEffect(() => {
    console.log('Property state:', property);
  }, [property]);

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
        // If the review is successfully added, fetch the updated property details
        const updatedResponse = await fetch(`/property/${id}`);
        const updatedData = await updatedResponse.json();
        setProperty(updatedData[0]);
        setNewReview(''); // Clear the input field
      } else {
        console.error('Failed to add review:', response.statusText);
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
        // If the review is successfully deleted, fetch the updated property details
        const updatedResponse = await fetch(`/property/${id}`);
        const updatedData = await updatedResponse.json();
        setProperty(updatedData[0]);
      } else {
        console.error('Failed to delete review:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

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
              {property.reviews.map((review) => (
                <li key={review.id}>
                  <p>
                    <strong>Review:</strong> {review.body}
                    {' '}
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}

          {/* Add Review Form */}
          <div>
            <h4>Add a Review</h4>
            <textarea
              rows="3"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <button onClick={handleAddReview}>Add Review</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PropertyDetails;
