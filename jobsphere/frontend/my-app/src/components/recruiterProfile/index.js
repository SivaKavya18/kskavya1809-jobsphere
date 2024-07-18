import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header2 from '../Header2';
import './index.css';

const RecruiterPage = ({ userId }) => {
  const [recruiterData, setRecruiterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    job_listings: [],
    password: '',
    confirm_password: '',
  });

  const recruiter = JSON.parse(localStorage.getItem('user'));
  const recruiterId = recruiter ? recruiter.id : null;

  useEffect(() => {
    const fetchRecruiterData = async () => {
      if (!recruiterId) {
        setError('User not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/recruiters/${recruiterId}`);
        setRecruiterData(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, [userId, recruiterId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/recruiters/${recruiterId}`, formData);
      setRecruiterData(response.data);
      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!recruiterId) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div>
      <Header2 />
      <div className="profile-container1">
        <h1 className="head2">Profile</h1>
        {loading ? (
          <p className='p'>Loading profile...</p>
        ) : error ? (
          <p className='p'>Error fetching profile data: {error}</p>
        ) : (
          <div className="profile-subcont1">
            {editMode ? (
              <div>
                <h2>Personal details</h2>
                <p className='p'>
                  <label>Name:</label>
                  <input className='recprofInput'
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                  <input className='recprofInput'
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </p>
                <p className='p'>
                  <label>Email:</label>
                  <input className='recprofInput'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </p>
                <p className='p'>
                  <label>Phone:</label>
                  <input className='recprofInput'
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </p>
                <p className='p'>
                  <label>Company:</label>
                  <input className='recprofInput'
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </p>
                <p className='p'>
                  <label>Position:</label>
                  <input className='recprofInput'
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </p>
                <ul className='recProfUl'>
                  {formData.job_listings.map((job, index) => (
                    <li key={index}>
                      <input className='recprofInput'
                        type="text"
                        name={`job_listings-${index}`}
                        value={job}
                        onChange={(e) => {
                          const updatedJobListings = [...formData.job_listings];
                          updatedJobListings[index] = e.target.value;
                          setFormData({
                            ...formData,
                            job_listings: updatedJobListings
                          });
                        }}
                      />
                    </li>
                  ))}
                </ul>
                <button className='recbtn' onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <h2>Personal details</h2>
                <p className='p'>
                  <span className='recProfSpan'>Name:</span> {recruiterData.first_name} {recruiterData.last_name}
                </p>
                <p className='p'>
                  <span className='recProfSpan'>Email:</span> {recruiterData.email}
                </p>
                <p className='p'>
                  <span className='recProfSpan'>Phone:</span> {recruiterData.phone}
                </p>
                <p className='p'>
                  <span className='recProfSpan'>Company:</span> {recruiterData.company}
                </p>
                <p className='p'>
                  <span className='recProfSpan'>Position:</span> {recruiterData.position}
                </p>
                <ul className='recProfUl'>
                  {recruiterData.job_listings.map((job, index) => (
                    <li key={index}>{job}</li>
                  ))}
                </ul>
                <button className='recbtn' onClick={() => setEditMode(true)}>Edit</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterPage;
