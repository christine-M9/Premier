// components/Comments.jsx
// Similar structure for Likes and Ratings components

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/articles/${articleId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error.response));
  }, [articleId]);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
