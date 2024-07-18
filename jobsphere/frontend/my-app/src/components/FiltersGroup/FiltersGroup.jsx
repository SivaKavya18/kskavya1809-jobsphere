import React, { useState } from 'react';
// import './Filters.css';

const FiltersGroup = ({ updateFilters }) => {
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    updateFilters({ location: event.target.value, minSalary, maxSalary });
  };

  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
    updateFilters({ location, minSalary: event.target.value, maxSalary });
  };

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
    updateFilters({ location, minSalary, maxSalary: event.target.value });
  };

  return (
    <div className="filters-group-container">
      <div className="filter-section">
        <h1 className="filter-heading">Location</h1>
        <input
          type="text"
          className="filters-list"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
      </div>
      <hr className="separator" />
      <div className="filter-section">
        <h1 className="filter-heading">Salary Range</h1>
        <div>
          <input
            type="number"
            className="filters-list"
            value={minSalary}
            onChange={handleMinSalaryChange}
            placeholder="Min Salary"
          />
          <input
            type="number"
            className="filters-list"
            value={maxSalary}
            onChange={handleMaxSalaryChange}
            placeholder="Max Salary"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersGroup;
