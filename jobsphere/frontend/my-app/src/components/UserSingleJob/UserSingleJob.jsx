import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './UserSingleJob.css';
import { useLocation } from 'react-router-dom';
import Header from '../Header';

const JobDetails = () => {
  const location=useLocation();
  const jobId = location.pathname.split('/')[2]; // Assuming you're using React Router to get jobId from URL
  // Replace with actual recruiter ID (can be fetched from authentication)
  const recruiter = JSON.parse(localStorage.getItem('user'))
  const recruiterId=recruiter.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editing, setEditing] = useState(false); // State to toggle editing mode
  const [updatedJob, setUpdatedJob] = useState({
    title: '',
    location: '',
    company: '',
    vacancy:'',
    expected_salary:'',
    description: '',
    qualifications:'',
    skills: ''
  });
  const [applications, setApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/job-listings/${jobId}`);
        setJob(response.data);
        setUpdatedJob({
          title: response.data.title,
          location: response.data.location,
          company: response.data.company,
          expected_salary:response.data.expected_salary,
          skills: response.data.skills,
          qualifications:response.data.qualifications,
          description: response.data.description
        });
      } catch (error) {
        setError('Error fetching job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/job-listings/${jobId}`);
      window.location.replace("/recruitersJob")
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'minSalary' || name === 'maxSalary') {
      setUpdatedJob((prevState) => ({
        ...prevState,
        salary_range: {
          ...prevState.salary_range,
          [name === 'minSalary' ? 'min' : 'max']: value
        }
      }));
    } else {
      setUpdatedJob((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/job-listings/${jobId}`, updatedJob);
      setJob({ ...updatedJob, recruiter: job.recruiter });
      setEditing(false);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/job-applications/${appId}`, { status: newStatus });
      // Update local state to reflect the change
      setApplications(applications.map(app => {
        if (app._id === appId) {
          return { ...app, status: newStatus };
        }
        return app;
      }));
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/job-applications/job/${jobId}`);
      console.log(response)
      setApplications(response.data);
      setShowApplications(true);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setShowApplications(true); // Ensure showApplications is false if fetching fails
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Header/>
    <div className='body'>
    <div className="job-details-container">
      <h2 className='jobHead'>Job Details</h2>
      <div className="job-details">
        <div className="left-column">
          {!editing ? (
            <>
              <h3>{job.title}</h3>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}</p>
              <p>Company: {job.company}</p>
              <p>Vacancy: {job.vacancy}</p>
              <p>Expected Salary: {job.expected_salary}</p>
              <p>Qualificatiobs: {job.qualifications.join(',')}</p>
              <p>Required Skills: {job.skills.join(',')}</p>
              
            </>
          ) : (
            <>
              <input type="text" name="title" value={updatedJob.title} onChange={handleInputChange} />
              <input type="text" name="location" value={updatedJob.location} onChange={handleInputChange} />
              <input type="text" name="company" value={updatedJob.company} onChange={handleInputChange} />
              <input type="text" name="vacancy" value={updatedJob.vacancy} onChange={handleInputChange} />
              <input type="text" name="expectedSalary" value={updatedJob.expected_salary} onChange={handleInputChange} />
              <textarea name="qualifications" value={updatedJob.qualifications} onChange={handleInputChange} />
              <textarea name="requirements" value={updatedJob.skills} onChange={handleInputChange} />
            </>
          )}
        </div>
        <div className="right-column">
          {!editing ? (
            <>
            <h3 className='desc'>Job Description</h3>
            <p className='jobDesc'>{job.description}</p>
            </>
          ) : (
            <textarea name="description" value={updatedJob.description} onChange={handleInputChange} />
          )}
        </div>
      </div>
      {job.recruiter && recruiterId === job.recruiter._id && (
                <div className="job-actions">
                  {!editing ? (
                    <>
                      <button onClick={toggleEditing}>Edit</button>
                      <button onClick={handleDelete}>Delete</button>
                      <button onClick={fetchApplications}>Applications</button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={toggleEditing}>Cancel</button>
                      <button onClick={handleDelete}>Delete</button>
                    </>
                  )}
                </div>
              )}
      {!editing && showApplications && (
        <div className='applications-container1'>
        <h3 className='desc'>Applications List for Job {job.title}</h3>
        {applications.length > 0 ? (
          
          <ul >
            <div className='listItems1'>            
              {applications.map((application) => (
              <li key={application._id} className='card1'>
                <p>Applicant: {application.user.first_name} {application.user.last_name}</p> {/* Assuming user has a 'name' field */}
                <p>Resume: <a href={application.user.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                <p>Applied Date: {new Date(application.application_date).toLocaleDateString()}</p>
                <p>Status: {application.status}</p>
                <div className='ulBtns'>
                <button className='shortlistBtn1 appBtn' onClick={() => updateApplicationStatus(application._id, 'shortlisted')}>Shortlist</button>
                <button className='acceptBtn1 appBtn' onClick={() => updateApplicationStatus(application._id, 'accepted')}>Accept</button>
                <button className='rejectBtn1 appBtn' onClick={() => updateApplicationStatus(application._id, 'rejected')}>Reject</button>
              </div>
              </li>

              ))}
              </div>
            
          </ul>
        ) : (
          <p>No applications received yet.</p>
        )}
      </div>
      )}
    </div>
    </div>
    </>
  );
};

export default JobDetails;
