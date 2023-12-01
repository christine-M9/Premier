// components/Ratings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ratings = ({ articleId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [articleId]);

  const fetchRatings = () => {
    axios.get(`/articles/${articleId}/ratings`)
      .then(response => {
        // Assuming the server responds with the average rating
        setAverageRating(response.data.average_rating);
      })
      .catch(error => console.error('Error fetching ratings:', error.response));
  };

  const handleRating = (rating) => {
    axios.post(`/articles/${articleId}/ratings`, { rating })
      .then(response => {
        // Assuming the server responds with the updated average rating
        setAverageRating(response.data.average_rating);
      })
      .catch(error => console.error('Error adding rating:', error.response));
  };

  return (
    <div>
      <h3>Average Rating: {averageRating.toFixed(2)}</h3>
      <div>
        <button onClick={() => handleRating(1)}>1</button>
        <button onClick={() => handleRating(2)}>2</button>
        <button onClick={() => handleRating(3)}>3</button>
        {/* Add more buttons for additional ratings if needed */}
      </div>
    </div>
  );
};

export default Ratings;
