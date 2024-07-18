import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ApplicationList.css"
import { useParams } from 'react-router-dom';
const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response= await axios.get("http://localhost:5000/api/job-applications/job/668f77607a602dfbb0888c5e");
        console.log(response.data)
        setApplications(response.data);
      } catch (error) {
        console.log(error)
        setError('Error fetching applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Applications List for Job {jobId}</h2>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              <p>Applicant: {application.user.first_name} {application.user.last_name}</p> {/* Assuming user has a 'name' field */}
              <p>Resume: <a href={application.user.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
              <p>Application Date: {new Date(application.application_date).toLocaleDateString()}</p>
              <p>Status: {application.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications received yet.</p>
      )}
    </div>
  );
};

export default ApplicationsList;
