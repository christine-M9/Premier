// components/Likes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Likes = ({ articleId }) => {
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchLikes();
  }, [articleId]);

  const fetchLikes = () => {
    axios.get(`/articles/${articleId}/likes`)
      .then(response => {
        // Check if the response data has the expected structure
        if (response.data && response.data.likes !== undefined) {
          setLikesCount(response.data.likes);
        } else {
          console.error('Invalid data format for likes:', response.data);
        }
      })
      .catch(error => console.error('Error fetching likes:', error.response));
  };

  const handleLike = () => {
    // Optimistically update likesCount
    setLikesCount(likesCount + 1);

    axios.post(`/articles/${articleId}/likes`)
      .then(response => {
        // Assuming the server responds with the likes count
        if (response.data && response.data.likes !== undefined) {
          setLikesCount(response.data.likes);
        } else {
          console.error('Invalid data format for likes:', response.data);
        }
      })
      .catch(error => {
        console.error('Error adding like:', error.response);
        // Revert to the previous likesCount in case of an error
        setLikesCount(likesCount);
      });
  };

  return (
    <div>
      <h3>Likes: {likesCount}</h3>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Likes;
