import React from 'react';
import './index.css';

const FiltersGroup = ({ onLocationChange, onSalaryRangeChange, onRoleChange}) => {

  const handleLocationChange = (event) => {
    const locationValue = event.target.value;
    onLocationChange(locationValue);  // Ensure onLocationChange is called correctly
  };

  const handleRoleChange = (event) => {
    const roleValue = event.target.value;
    onRoleChange(roleValue);  // Ensure onLocationChange is called correctly
  };

  const handleSalaryRangeChange = (event) => {
    const salaryRangeValue = event.target.value;
    onSalaryRangeChange(salaryRangeValue);
  };

  return (
    <div className="filters-group-container">
      <h1 className="filter-heading">Job Location</h1>
      <input
        type="text"
        className="location-input"
        placeholder="Enter Job Location"
        onChange={handleLocationChange}
      />

      <hr className="separator" />

      <h1 className="filter-heading">Job Role</h1>
      <input
        type="text"
        className="location-input"
        placeholder="Enter Job Role"
        onChange={handleRoleChange}
      />

      <hr className="separator" />
      

      <h1 className="filter-heading">Salary Range</h1>
      <select className="dropdown-salary" onChange={handleSalaryRangeChange}>
        <option className="salary-value" value="">Select Salary Range</option>
        <option className="salary-value" value="1000000-2000000">10,00,000 - 20,00,000</option>
        <option className="salary-value" value="2000001-3000000">20,00,001 - 30,00,000</option>
        <option className="salary-value" value="3000001-4000000">30,00,001 - 40,00,000</option>
        <option className="salary-value" value="4000001">Above 40,00,000</option>
      </select>
    </div>
  );
};

export default FiltersGroup;
