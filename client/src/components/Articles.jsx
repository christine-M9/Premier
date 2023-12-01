// components/Articles.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import Likes from './Likes';
import Ratings from './Ratings';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('/articles')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching articles:', error.response));
  }, []);

  // Handle the case where articles is not an array
  if (!Array.isArray(articles)) {
    return <div>Loading...</div>; // You can customize the loading state as needed
  }

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>

            <Comments articleId={article.id} />
            <Likes articleId={article.id} />
            <Ratings articleId={article.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
