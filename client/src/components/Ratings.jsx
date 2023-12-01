// components/Ratings.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ratings = ({ articleId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    axios.get(`/api/articles/${articleId}/ratings`)
      .then(response => setAverageRating(response.data.average_rating))
      .catch(error => console.error('Error fetching ratings:', error.response));
  }, [articleId]);

  const handleRating = (rating) => {
    axios.post(`/api/articles/${articleId}/ratings`, { rating })
      .then(response => {
        // Assuming the server responds with the updated average rating
        setAverageRating(response.data.average_rating);
      })
      .catch(error => console.error('Error adding rating:', error.response));
  };

  return (
    <div>
      <h3>Average Rating: {averageRating}</h3>
      <button onClick={() => handleRating(1)}>1</button>
      <button onClick={() => handleRating(2)}>2</button>
      <button onClick={() => handleRating(3)}>3</button>
      {/* Add more buttons for additional ratings if needed */}
    </div>
  );
};

export default Ratings;
