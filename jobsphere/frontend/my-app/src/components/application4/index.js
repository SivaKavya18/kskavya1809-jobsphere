import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import Header from '../Header';

const Applications = ({ userId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[showRequirements, setShowRequirements] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const userId=user.id;
        const response = await axios.get(`http://localhost:5000/api/job-applications/user/${userId}`);
        if (response.data) {
          setApplications(response.data);
        } else {
          setApplications([]);
        }
        setLoading(false);
      } catch (error) {
        // setError(error.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const toggleRequirements = (id) => {
    setShowRequirements((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Header/>
    {/* <div className='body'>
      
      <div className="applications-container">
        
        <h1>Applications</h1>
        <ul>
          {applications.length > 0 ? (
            applications.map((application) => (
              <li key={application._id} className="job-details-container">
                <h2 className='jobHead'>{application.job_listing.title}</h2>
                <div className="job-details">
                  <div className="left-column">
                    <h3>{application.job_listing.title}</h3>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {application.job_listing.location}</p>
                    <p>Company: {application.job_listing.company}</p>
                    <p>Min Salary: {application.job_listing.salary_range.min}</p>
                    <p>Max Salary: {application.job_listing.salary_range.max}</p>
                    <p>Status:{application.status}</p>
                    <button onClick={() => toggleRequirements(application._id)}>
                      {showRequirements[application._id] ? 'Less' : 'More'}
                    </button>
                    {showRequirements[application._id] && (
                      <div>
                        <p>Requirements:</p>
                        <ul>
                          {application.job_listing.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="right-column">
                    <h3 className='desc'>Job Description</h3>
                    <p className='jobDesc'>{application.job_listing.description}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No applications found.</li>
          )}
        </ul>
      </div>
    </div> */}
    {setApplications && (
        <div className='applications-container1'>
        <h3 className='desc'>Applied Job List</h3>
        {applications.length > 0 ? (
          
          <ul >
            <div className='listItems1'>            
              {applications.map((application) => (
              <li key={application._id} className='card1'>
                <p>Applicant: {application.user.first_name} {application.user.last_name}</p> {/* Assuming user has a 'name' field */}
                <p>Resume: <a href={application.user.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                <p>Applied Date: {new Date(application.application_date).toLocaleDateString()}</p>
                <div >
                    <h3>{application.job_listing.title}</h3>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {application.job_listing.location}</p>
                    <p>Company : {application.job_listing.company}</p>
                    <p>Expected Salary : {application.job_listing.expected_salary}</p>
                    <p>Vacancy : {application.job_listing.vacancy}</p>
                    <p>Status : {application.status.toUpperCase()}</p>
                    {/* <button onClick={() => toggleRequirements(application._id)}>
                      {showRequirements[application._id] ? 'Less' : 'More'}
                    </button> */}
                    <button className='viewMoreBtn' onClick={()=>window.location.replace(`singleJob/${application.job_listing._id}`)}>View More</button>
                    {showRequirements[application._id] && (
                      <div>
                        <p>Required skills:</p>
                        <ul>
                          {application.job_listing.skills.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                
                {/* <div className='ulBtns'>
                  {{application.status}=="shortlisted" ?(

                    <button className='shortlistBtn1 appBtn' >Shortlist</button>}
                  )}
                {/* <button className='acceptBtn1 appBtn' >Accept</button>
                <button className='rejectBtn1 appBtn'>Reject</button> */} 
              {/* </div> */}
              </li>

              ))}
              </div>
            
          </ul>
        ) : (
          <p>No applications</p>
        )}
      </div>
      )}
    </>
  );
};

export default Applications;
