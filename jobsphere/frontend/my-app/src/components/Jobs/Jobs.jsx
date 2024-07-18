import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FiltersGroup from '../Filters/Filters';
import JobCard from '../JobCard/JobCard';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({ location: '', salaryRange: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/job-listings');
        setJobs(response.data);
        setFilteredJobs(response.data); // Set initial filtered jobs to all jobs
      } catch (error) {
        console.error('Error fetching job listings', error);
      }
    };

    fetchJobs();
  }, []);

  const updateFilters = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = jobs;

      if (filters.location) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.salaryRange) {
        filtered = filtered.filter((job) =>
          job.salary_range.max >= parseInt(filters.salaryRange)
        );
      }

      setFilteredJobs(filtered);
    };

    applyFilters();
  }, [filters, jobs]);

  return (
    <div className="jobs-page">
      <FiltersGroup updateFilters={updateFilters} />
      <ul className="job-list">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} {...job} />
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
