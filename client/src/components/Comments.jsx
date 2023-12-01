// components/Comments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = () => {
    axios.get(`/articles/${articleId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error.response));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') {
      // Do not submit empty comments
      return;
    }

    axios.post(`/articles/${articleId}/comments`, { content: newComment })
      .then(response => {
        // Check if the response data has the expected structure
        if (response.data && response.data.comment) {
          setComments([...comments, response.data.comment]);
          setNewComment(''); // Clear the input field after submission
        } else {
          console.error('Invalid data format for comments:', response.data);
        }
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Comments;
