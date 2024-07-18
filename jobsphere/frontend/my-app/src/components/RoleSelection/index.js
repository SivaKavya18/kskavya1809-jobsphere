// RoleSelection.js

import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const RoleSelection = () => {
  return (
    <div className="role-selection-container">
      <div className="con">
         
      
      <h1 className='title'>Choose Your Role</h1>
      <div className="role-buttons">
        <Link to="/register/recruiter" className="role-button">Recruiter</Link>
        <Link to="/register/user" className="role-button">Job Seeker</Link>
      </div>
      </div>
    </div>
  );
};

export default RoleSelection;