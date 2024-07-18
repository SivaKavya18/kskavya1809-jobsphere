import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecruiterJobs.css';
import Header from '../Header2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
const RecruiterJobs = () => {
  
  const recruiter = JSON.parse(localStorage.getItem('user'))
  const recruiterId=recruiter.id;
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/job-listings/recruiter/${recruiterId}`);
        setJobListings(response.data);
      } catch (error) {
        // setError('Error fetching job listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobListings();
  }, [recruiterId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleClick=async(jobId)=>{
    try{
      window.location.replace(`http://localhost:3000/singleJobApplication/${jobId}`)
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
    <Header/>
    <div className="recruiter-jobs-container">
      <h2 className='recruiterHead'>JOB  LISTINGS</h2>
      {jobListings.length === 0 ? (
        <p>No job listings found for this recruiter.</p>
      ) : (
        <ul className="job-listings">
          {jobListings.map((job) => (
            <li key={job._id} className="job-listing">
              <h3 className='rjobTitle'>{job.title}</h3>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}</p>
              <p>Company: {job.company}</p>
              <p>Vacancy: {job.vacancy}</p>
              <div>
                <p>Expected Salary:{job.expected_salary}</p>
              </div>
              <div>
                <p>Qualifications : {job.qualifications.join(',')}</p>
              </div>
              <div>
                <p>Required Skills: {job.skills.join(',')}</p>
              </div>
              <div  >
              <button className="viewMoreBtn" onClick={()=>handleClick(job._id)}>View More</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default RecruiterJobs;
