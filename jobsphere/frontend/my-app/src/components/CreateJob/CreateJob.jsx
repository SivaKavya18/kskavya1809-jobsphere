import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css'; // Make sure to import the CSS file
import Header from '../Header2';

const CreateJob = () => {
  const recruiter = JSON.parse(localStorage.getItem('user'))
  const recruiterId=recruiter.id;
  const compan=recruiter.company;
  console.log(compan)
  const initialFormData = {
    title: '',
    description: '',
    location: '',
    expected_salary:' ',
    company: '',
    qualifications:' ',
    skills: '',
    benefits: '',
    vacancy:''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobListingData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      vacancy: formData.vacancy,
      expected_salary: formData.expected_salary,
      company: compan,
      recruiter: recruiterId, // Replace with actual recruiter ID
      qualifications: formData.qualifications.split(',').map((req) => req.trim()),
      skills: formData.skills.split(',').map((req) => req.trim()),
      benefits: formData.benefits.split(',').map((ben) => ben.trim()),
    };

    try {
      await axios.post('http://localhost:5000/api/job-listings', jobListingData);
      setMessage('Job listing created successfully!');
      setFormData(initialFormData); // Clear form fields
      window.location.replace(`http://localhost:3000/recruitersJob`)
    } catch (error) {
      setMessage('Error creating job listing');
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
    <div className="create-job-container">
      <div className="create-job-form">
        <h2 className='createJob'>CREATE JOB </h2>
        <form  onSubmit={handleSubmit}>
          <div className="fromCont">
          <div className='left-column1'>
          <div className="input-group full-width">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          

          <div className="form-row">
            <div className="form-column">
              <div className="input-group half">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group half">
                <label htmlFor="expected_salary">Expected Salary</label>
                <input
                  type="number"
                  id="expected_salary"
                  name="expected_salary"
                  value={formData.expected_salary}
                  onChange={handleChange}
                  required
                />
              </div>
              
            </div>

            <div className="form-column">
              
            <div className="input-group ">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={compan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group half">
                <label htmlFor="vacancy">Vacancy</label>
                <input
                  type="number"
                  id="vacancy"
                  name="vacancy"
                  value={formData.vacancy}
                  onChange={handleChange}
                  required
                />
              </div>
              
            </div>
          </div>
          <div className="input-group full-width">
            <label htmlFor="qualifications">Quaifications (comma separated)</label>
            <input
              
              type="text"
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group full-width">
            <label htmlFor="skills">Required Skills (comma separated)</label>
            <input
              
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group full-width">
            <label htmlFor="benefits">Benefits (comma separated)</label>
            <input
              type="text"
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
            />
          </div>
          </div>
          <div className="right-column1">
          <div className="input-group full-width">
            <label htmlFor="description">Job Description</label>
            <textarea
              rows="24"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="descTextarea"
            ></textarea>
          </div>
          </div>
          </div>
          <div className="form-center">
            <button className='createJobBtn' type="submit">Create Job</button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
    </>
  );
};

export default CreateJob;
