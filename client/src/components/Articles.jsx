import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('api/articles')
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
            {article.title} - {article.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
