import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './index.css';
import logo from './logo.png'

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo-img" />

      <div className="navbar-menu">
        <Link className="logo-link" to="/recHome">Home</Link>
        <Link className="logo-link" to="/createJob">Create Job</Link>
        <Link className="logo-link" to="/recruitersJob">My Job Listings</Link>
        <div className="head2-icon">
          <FaUserCircle size={30} className="navbar-user-icon" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="navbar-dropdown">
              <Link to="/recruiter">Profile</Link>
            </div>
          )}
        </div>
        <button
          type="button"
          className="logout-button-lg"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
