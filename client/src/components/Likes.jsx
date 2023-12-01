// components/Likes.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Likes = ({ articleId }) => {
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    axios.get(`/api/articles/${articleId}/likes`)
      .then(response => setLikesCount(response.data.likes))
      .catch(error => console.error('Error fetching likes:', error.response));
  }, [articleId]);

  const handleLike = () => {
    axios.post(`/api/articles/${articleId}/likes`)
      .then(response => {
        // Assuming the server responds with the updated likes count
        setLikesCount(response.data.likes);
      })
      .catch(error => console.error('Error adding like:', error.response));
  };

  return (
    <div>
      <h3>Likes: {likesCount}</h3>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Likes;
