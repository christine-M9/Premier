// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Premier League Website</h1>
      <p>Explore articles, comments, likes, ratings, and subscribers!</p>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
