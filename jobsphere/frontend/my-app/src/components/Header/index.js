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
      <Link className='logo-link' to="/">Home</Link>
      <Link className='logo-link' to="/jobs">Jobs</Link>
      <div className="head2-icon">
          <FaUserCircle size={30} className="navbar-user-icon user" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="navbar-dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/applications">Applications</Link>
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
