import React from 'react';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import './JobCard.css';

const JobCard = ({ _id, title, description, location, salary_range, company }) => {
  return (
    <li className="job-card">
      <Link to={`/singleJobApplication/${_id}`} className="job-card-link">
        <div className="job-card-header">
          <h2 className="job-title">{title}</h2>
          <p className="job-company">{company}</p>
        </div>
        <div className="location-package-container">
          <div className="icon-type-container">
            <IoLocationSharp className="type-icon" />
            <p className="type-text">{location}</p>
          </div>
          <div className="icon-type-container">
            <BsFillBriefcaseFill className="type-icon" />
            <p className="type-text">{`${salary_range.min} - ${salary_range.max} LPA`}</p>
          </div>
        </div>
        <p className="job-description">{description}</p>
      </Link>
    </li>
  );
};

export default JobCard;
