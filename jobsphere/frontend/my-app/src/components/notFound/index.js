import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-info">
      We're sorry, the page you requested could not be found.
    </p>
    <Link to="/">
      <button type="button" className="home-btn">
        Go Home
      </button>
    </Link>
  </div>
);

export default NotFound;
