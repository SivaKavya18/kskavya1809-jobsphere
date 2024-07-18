// models/JobListing.js
const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  vacancy:{type:Number},
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  expected_salary:{type:String},
  company: { type: String, required: true },
  posted_date: { type: Date, default: Date.now },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  qualifications:[String],
  status:{
    type:String,
    enum:[
      "Active",
      "Deleted"
    ]
  },
  skills: [String], // Array of strings representing job requirements
  benefits: [String] // Array of strings representing job benefits
});

module.exports = mongoose.model('JobListing', jobListingSchema);
