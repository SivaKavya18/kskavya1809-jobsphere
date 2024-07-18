import React, { useState } from 'react';
import './index.css';

const JobCard = ({ jobDetails }) => {
  const { title, company, description, location, salary_range, posted_date, requirements, benefits } = jobDetails;
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="job-card">
      <h2 className="job-title">{title}</h2>
      <p className="job-company">{company}</p>
      <p className="job-description">{description}</p>
      <p className="job-location">Location: {location}</p>
      <p className="job-salary">Salary Range: ${salary_range.min} - ${salary_range.max}</p>
      <p className="job-posted-date">Posted Date: {new Date(posted_date).toLocaleDateString()}</p>
      <button onClick={toggleShowMore}>
        {showMore ? 'Less' : 'More'}
      </button>
      {showMore && (
        <div>
          <div className="job-requirements">
            <h3>Requirements:</h3>
            <ul>
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          <div className="job-benefits">
            <h3>Benefits:</h3>
            <ul>
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
