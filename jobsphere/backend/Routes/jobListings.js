// routes/jobListings.js
const express = require('express');
const router = express.Router();
const JobListing = require('../Models/Job');
const JobApplication = require('../Models/Application');

// Create a new job listing
router.post('/', async (req, res) => {
  try {
    const jobListing = new JobListing(req.body);
    await jobListing.save();
    res.status(201).send(jobListing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all job listings
router.get('/', async (req, res) => {
  try {
    const jobListings = await JobListing.find({ vacancy: { $ne: 0 } }).populate('recruiter');
    res.send(jobListings);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/recruiter/:recruiterId', async (req, res) => {
  try {
    const jobListings = await JobListing.find({ recruiter: req.params.recruiterId }).populate('recruiter');
    if (!jobListings || jobListings.length === 0) {
      return res.status(404).send({ message: 'No job listings found for this recruiter.' });
    }
    res.send(jobListings);
  } catch (error) {
    res.status(500).send(error);
  }
});

//not applied jobs
router.get('/not-applied/:userId', async (req, res) => {
  const { userId } = req.params;
  const { location, role,minSalary, maxSalary } = req.query;

  try {
    // Get all job applications by the user
    const userApplications = await JobApplication.find({ user: userId });
    const appliedJobIds = userApplications.map(app => app.job_listing);

    // Build query to find job listings
    let query = {
      vacancy: { $ne: 0 },
      _id: { $nin: appliedJobIds }
    };

    // Add location filter if provided
    if (location) {
      query.location = new RegExp(location, 'i'); // Case-insensitive regex search
    }

    if(role){
      query.title= new RegExp(role,'i');
    }

    // Add salary range filter if provided
    if (minSalary && maxSalary) {
      query.expected_salary = {
        $gte: parseInt(minSalary),
        $lte: parseInt(maxSalary)
      };
    } else if (minSalary) {
      query.expected_salary = { $gte: parseInt(minSalary) };
    }

    // Find job listings based on the query
    const jobListings = await JobListing.find(query).populate('recruiter');

    res.json(jobListings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// Get a job listing by ID
router.get('/:id', async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id).populate('recruiter');
    if (!jobListing) {
      return res.status(404).send();
    }
    res.send(jobListing);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a job listing by ID
router.patch('/:id', async (req, res) => {
  try {
    const jobListing = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!jobListing) {
      return res.status(404).send();
    }
    res.send(jobListing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a job listing by ID
router.delete('/:id', async (req, res) => {
  try {
    const jobListing = await JobListing.findByIdAndDelete(req.params.id);
    if (!jobListing) {
      return res.status(404).send();
    }
    res.send(jobListing);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
