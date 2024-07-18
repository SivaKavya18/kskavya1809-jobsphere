import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css';


const Profile = () => {
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
      country: ''
    },
    resume: '',
    cover_letter: '',
    skills: [],
    experience: [],
    education: []
  });

  

  useEffect(() => {
   
      const fetchProfileData = async (userId) => {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          const userId=user.id;
          console.log(userId)
          const response = await axios.get(`http://localhost:5000/api/job-applicants/${userId}`);
          setProfileData(response.data);
          setFormData(response.data);
          setLoading(false);
          console.log(response.data)
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchProfileData();
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedInputChange = (e, parent, index) => {
    const { name, value } = e.target;
    const updatedArray = formData[parent].map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormData({
      ...formData,
      [parent]: updatedArray
    });
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
          const userId=user.id;
          console.log(userId)
      const response = await axios.patch(`http://localhost:5000/api/job-applicants/${userId}`, formData);
      setProfileData(response.data);
      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1 className="head1">Profile</h1>
        {loading ? (
          <p className='p'>Loading profile...</p>
        ) : error ? (
          <p className='p'>Error fetching profile data: {error}</p>
        ) : (
          <div className="profile-subcont">
            {editMode ? (
              <div className="profile-columns">
                <div className="profile-left">
                  <h2 className='details'>Personal details</h2>
                  <p className='p'>
                    <label className='label'>Name:</label>
                    <input className='profInput'
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                    <input className='profInput'
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p className='p'>
                    <label className='label'>Email:</label>
                    <input className='profInput'
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p className='p'>
                    <label className='label'>Phone:</label>
                    <input className='profInput'
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </p>
                  <h2 className='details'>Address</h2>
                  <p className='p'>
                    <label className='label'>Street:</label>
                    <input className='profInput'
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={(e) => handleNestedInputChange(e, 'address', 0)}
                    />
                  </p>
                  <p className='p'>
                    <label className='label'>City:</label>
                    <input className='profInput'
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={(e) => handleNestedInputChange(e, 'address', 0)}
                    />
                  </p>
                  <p className='p'>
                    <label className='label'>State:</label>
                    <input className='profInput'
                      type="text"
                      name="state"
                      value={formData.address.state}
                      onChange={(e) => handleNestedInputChange(e, 'address', 0)}
                    />
                  </p>
                  <p className='p'>
                    <label className='label'>Zip Code:</label>
                    <input className='profInput'
                      type="text"
                      name="zip_code"
                      value={formData.address.zip_code}
                      onChange={(e) => handleNestedInputChange(e, 'address', 0)}
                    />
                  </p>
                  <p className='p'>
                    <label className='label'>Country:</label>
                    <input className='profInput'
                      type="text"
                      name="country"
                      value={formData.address.country}
                      onChange={(e) => handleNestedInputChange(e, 'address', 0)}
                    />
                  </p>
                  <h2 className='details'>Resume</h2>
                  <p className='p'>
                    <label className='label'>Resume URL:</label>
                    <input className='profInput'
                      type="text"
                      name="resume"
                      value={formData.resume}
                      onChange={handleInputChange}
                    />
                  </p>
                  <h2 className='details'>Cover Letter</h2>
                  <p className='p'>
                    <label className='label'>Cover Letter URL:</label>
                    <input className='profInput'
                      type="text"
                      name="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
                <div className="profile-right">
                  <h2 className='details'>Skills</h2>
                  <ul className='.profUl'>
                    {formData.skills.map((skill, index) => (
                      <li className='li' key={index}>
                        <input className='profInput'
                          type="text"
                          name={`skill-${index}`}
                          value={skill}
                          onChange={(e) => {
                            const updatedSkills = [...formData.skills];
                            updatedSkills[index] = e.target.value;
                            setFormData({
                              ...formData,
                              skills: updatedSkills
                            });
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <h2 className='details'>Experience</h2>
                  {formData.experience.map((exp, index) => (
                    <div key={index}>
                      <p className='p'>
                        <label className='label'>Company:</label>
                        <input className='profInput'
                          type="text"
                          name="company_name"
                          value={exp.company_name}
                          onChange={(e) => handleNestedInputChange(e, 'experience', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>Job Title:</label>
                        <input className='profInput'
                          type="text"
                          name="job_title"
                          value={exp.job_title}
                          onChange={(e) => handleNestedInputChange(e, 'experience', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>Start Date:</label>
                        <input className='profInput'
                          type="date"
                          name="start_date"
                          value={new Date(exp.start_date).toISOString().split('T')[0]}
                          onChange={(e) => handleNestedInputChange(e, 'experience', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>End Date:</label>
                        <input className='profInput'
                          type="date"
                          name="end_date"
                          value={new Date(exp.end_date).toISOString().split('T')[0]}
                          onChange={(e) => handleNestedInputChange(e, 'experience', index)}
                        />
                      </p>
                    </div>
                  ))}
                  <h2 className='details'>Education</h2>
                  {formData.education.map((edu, index) => (
                    <div key={index}>
                      <p className='p'>
                        <label className='label'>School:</label>
                        <input className='profInput'
                          type="text"
                          name="school"
                          value={edu.institution_name}
                          onChange={(e) => handleNestedInputChange(e, 'education', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>Degree:</label>
                        <input className='profInput'
                          type="text"
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleNestedInputChange(e, 'education', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>Field of Study:</label>
                        <input className='profInput'
                          type="text"
                          name="field_of_study"
                          value={edu.field_of_study}
                          onChange={(e) => handleNestedInputChange(e, 'education', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>Start Date:</label>
                        <input className='profInput'
                          type="date"
                          name="start_date"
                          value={new Date(edu.start_date).toISOString().split('T')[0]}
                          onChange={(e) => handleNestedInputChange(e, 'education', index)}
                        />
                      </p>
                      <p className='p'>
                        <label className='label'>End Date:</label>
                        <input className='profInput'
                          type="date"
                          name="end_date"
                          value={new Date(edu.end_date).toISOString().split('T')[0]}
                          onChange={(e) => handleNestedInputChange(e, 'education', index)}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className='details'>Personal details</h2>
                <p className='p'>
                  <label className='label'>Name:</label>
                  {profileData.first_name} {profileData.last_name}
                </p>
                <p className='p'>
                  <label className='label'>Email:</label>
                  {profileData.email}
                </p>
                <p className='p'>
                  <label className='label'>Phone:</label>
                  {profileData.phone}
                </p>
                <h2>Address</h2>
                <p className='p'>
                  <label className='label'>Street:</label>
                  {profileData.address.street}
                </p>
                <p className='p'>
                  <label className='label'>City:</label>
                  {profileData.address.city}
                </p>
                <p className='p'>
                  <label className='label'>State:</label>
                  {profileData.address.state}
                </p>
                <p className='p'>
                  <label className='label'>Zip Code:</label>
                  {profileData.address.zip_code}
                </p>
                <p className='p'>
                  <label className='label'>Country:</label>
                  {profileData.address.country}
                </p>
                <h2 className='details'>Resume</h2>
                <p className='p'>
                  <label className='label'>Resume URL:</label>
                  {profileData.resume}
                </p>
                <h2 className='details'>Cover Letter</h2>
                <p className='p'>
                  <label className='label'>Cover Letter URL:</label>
                  {profileData.cover_letter}
                </p>
                <h2 className='details'>Skills</h2>
                <ul className='.profUl'>
                  {profileData.skills.map((skill, index) => (
                    <li className='li' key={index}>{skill}</li>
                  ))}
                </ul>
                <h2 className='details'>Experience</h2>
                {profileData.experience.map((exp, index) => (
                  <div key={index}>
                    <p className='p'>
                      <label className='label'>Company:</label>
                      {exp.company_name}
                    </p>
                    <p className='p'>
                      <label className='label'>Job Title:</label>
                      {exp.job_title}
                    </p>
                    <p className='p'>
                      <label className='label'>Start Date:</label>
                      {new Date(exp.start_date).toISOString().split('T')[0]}
                    </p>
                    <p className='p'>
                      <label className='label'>End Date:</label>
                      {new Date(exp.end_date).toISOString().split('T')[0]}
                    </p>
                  </div>
                ))}
                <h2 className='details'>Education</h2>
                {profileData.education.map((edu, index) => (
                  <div key={index}>
                    <p className='p'>
                      <label className='label'>School:</label>
                      {edu.institution_name}
                    </p>
                    <p className='p'>
                      <label className='label'>Degree:</label>
                      {edu.degree}
                    </p>
                    <p className='p'>
                      <label className='label'>Field of Study:</label>
                      {edu.field_of_study}
                    </p>
                    <p className='p'>
                      <label className='label'>Start Date:</label>
                      {new Date(edu.start_date).toISOString().split('T')[0]}
                    </p>
                    <p className='p'>
                      <label className='label'>End Date:</label>
                      {new Date(edu.end_date).toISOString().split('T')[0]}
                    </p>
                  </div>
                ))}
                <button className='profEditBtn' onClick={() => setEditMode(true)}>Edit</button>
              </div>
            )}
            {editMode && (
              <button className="probtn" onClick={handleSave}>Save</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
