import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationsList from './components/ApplicationsList/ApplicationList';

import Login from './components/Login/Login.jsx';
import Home from './components/home/index.js';
import UserPage from './components/UserPage';
import RecruiterPage from './components/recruiterProfile';
import UserProfile from './components/profilePage';
import Applications from './components/application4';
import NotFound from './components/notFound';
import UserRegister from './components/UserRegsiter';
import RecruiterRegister from './components/RecruiterRegister'
import RoleSelection from './components/RoleSelection'; 
import RecHome from './components/RecHome'
import UserSingleJob from "./components/UserSingleJob/UserSingleJob.jsx"

import SingleJobApplication from "./components/SingleJobApplications/SingleJobApplication";
import RecruiterJob from "./components/RecruiterJobs/RecruiterJobs"
import CreateJob from "./components/CreateJob/CreateJob"

function App() {
  return (
    <Router>
      <Routes>
        
      <Route path="/createJob" element={<CreateJob/>}/>
        <Route path="/singleJobApplication/:id" element={<SingleJobApplication />} />
        <Route path="/recruitersJob" element={<RecruiterJob/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/recHome" element={<RecHome />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/recruiter" element={<RecruiterRegister />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/jobs" element={<UserPage />} />
        <Route path="/" element={<Home />} />
        <Route path='/app' element={<Applications/>}/>
        <Route path="/profile" element={<UserProfile />} />
        <Route path='/singleJob/:id' element={<UserSingleJob/>}/>
        <Route path="/applications/:jobId" element={<ApplicationsList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
