import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import Header from '../Header';
import FiltersGroup from '../Filters'; // Adjust path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const RecruiterJobs = () => {
  const recruiter = JSON.parse(localStorage.getItem('user'));
  const recruiterId = recruiter.id;
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [roleFilter,setRoleFilter] = useState('');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState('');

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        let minSalary = '';
    let maxSalary = '';
    console.log(typeof salaryRangeFilter)
    if (salaryRangeFilter && typeof salaryRangeFilter === 'string') {
      const parts = salaryRangeFilter.split('-');
      if (parts.length === 2) {
        minSalary = parts[0].trim();
        maxSalary = parts[1].trim();
      }
      else if(parts.length===1){
        minSalary=parts[0].trim();
      }
    }

    console.log(minSalary)

    const response = await axios.get(`http://localhost:5000/api/job-listings/not-applied/${userId}`, {
      params: {
        location: locationFilter,
        role:roleFilter,
        minSalary: minSalary,
        maxSalary: maxSalary
      }
    });

        setJobListings(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobListings();
  }, [recruiterId, locationFilter,roleFilter, salaryRangeFilter]);

  const handleClick = async (jobId) => {
    try {
      window.location.replace(`http://localhost:3000/singleJob/${jobId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleApplyClick = async (jobId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    const jobApply = {
      user: userId,
      job_listing: jobId
    };

    try {
      const response = await axios.post('http://localhost:5000/api/job-applications', jobApply);
      console.log('Application submitted successfully:', response.data);
      window.location.replace("/applications");
    } catch (e) {
      console.log('Error submitting application:', e);
    }
  };

  const updateLocationFilter = (location) => {
    setLocationFilter(location);
  };

  const updateSalaryRangeFilter = (salaryRange) => {
    setSalaryRangeFilter(salaryRange);
  };

  const updateRoleRangeFilter =(role) =>{
    setRoleFilter(role)
  }

  return (
    <>
      <Header />
      <div className='filter-jobs-con'>
      <FiltersGroup
        onLocationChange={updateLocationFilter}
        onSalaryRangeChange={updateSalaryRangeFilter}
        onRoleChange={updateRoleRangeFilter}
      />
      
      <div className="recruiter-jobs-container">
        <h2 className='recruiterHead'>JOB LISTINGS</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : jobListings.length === 0 ? (
          <p>No un-applied jobs.</p>
        ) : (
          <ul className="job-listings">
            {jobListings.map((job) => (
              <li key={job._id} className="job-listing">
                <h3 className='rjobTitle'>{job.title}</h3>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}</p>
                <p>Company: {job.company}</p>
                <p>Vacancy: {job.vacancy}</p>
                <div>
                  <p>Expected Salary: {job.expected_salary}</p>
                </div>
                <div>
                  <p>Qualifications: {job.qualifications.join(', ')}</p>
                </div>
                <div>
                  <p>Required Skills: {job.skills.join(', ')}</p>
                </div>
                <div>
                  <button className="viewMoreBtn" onClick={() => handleClick(job._id)}>View More</button>
                  <button className="applyBtn" onClick={() => handleApplyClick(job._id)}>Apply</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </>
  );
};

export default RecruiterJobs;
