import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Navigate, Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import './index.css'

class RecruiterRegister extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    password: '',
    confirmPassword: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  // onSuccessRegister = jwtToken => {
  //   Cookies.set('jwt_token', jwtToken, { expires: 30 })
  //   console.log(jwtToken)
  //   const { navigate } = this.props
  //   navigate('/recHome')
  // }

  onFailureRegister = errorMsg => {
    this.setState({ errorMsg, showErrorMsg: true })
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      position,
      password,
      confirmPassword,
    } = this.state

    const userDetails = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      position,
      password,
      confirm_password: confirmPassword,
    }

    try {
      const response = await axios.post('http://localhost:5000/api/recruiters', userDetails)
      if (response.status === 200) {
        console.log(response)
        // this.onSuccessRegister(response.data.jwt_token)
        window.location.replace("/login")
      }
    } catch (error) {
      if (error.response) {
        this.onFailureRegister(error.response.data.message)
        
      } else {
        this.onFailureRegister('Something went wrong. Please try again.')
      }
    }
  }

  handleChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  renderFirstNameField = () => {
    const { firstName } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="firstName" className="login-input-label">
          FIRST NAME
        </label>
        <input
          type="text"
          value={firstName}
          className="login-input-field"
          placeholder="Enter your first name"
          id="firstName"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderLastNameField = () => {
    const { lastName } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="lastName" className="login-input-label">
          LAST NAME
        </label>
        <input
          type="text"
          value={lastName}
          className="login-input-field"
          placeholder="Enter your last name"
          id="lastName"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderEmailField = () => {
    const { email } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="email" className="login-input-label">
          EMAIL
        </label>
        <input
          type="email"
          value={email}
          className="login-input-field"
          placeholder="Enter your email"
          id="email"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderPhoneField = () => {
    const { phone } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="phone" className="login-input-label">
          PHONE
        </label>
        <input
          type="text"
          value={phone}
          className="login-input-field"
          placeholder="Enter your phone number"
          id="phone"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderCompanyField = () => {
    const { company } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="company" className="login-input-label">
          COMPANY
        </label>
        <input
          type="text"
          value={company}
          className="login-input-field"
          placeholder="Enter your company name"
          id="company"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderPositionField = () => {
    const { position } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="position" className="login-input-label">
          POSITION
        </label>
        <input
          type="text"
          value={position}
          className="login-input-field"
          placeholder="Enter your position"
          id="position"
          onChange={this.handleChange}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const { password } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="password" className="login-input-label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          className="login-input-field"
          placeholder="Enter your password"
          id="password"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderConfirmPasswordField = () => {
    const { confirmPassword } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="confirmPassword" className="login-input-label">
          CONFIRM PASSWORD
        </label>
        <input
          type="password"
          value={confirmPassword}
          className="login-input-field"
          placeholder="Confirm your password"
          id="confirmPassword"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  render() {
    const { errorMsg, showErrorMsg } = this.state

    if (Cookies.get('jwt_token')) {
      return <Navigate to="/" />
    }

    return (
      <div className="register-container">
        <form className="register-form" onSubmit={this.onSubmitForm}>
        <img
            src={logo}
            alt="website logo"
            className="website-logo-login-form"
          />
          <h1>Recruiter Registration</h1>
          {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          {this.renderFirstNameField()}
          {this.renderLastNameField()}
          {this.renderEmailField()}
          {this.renderPhoneField()}
          {this.renderCompanyField()}
          {this.renderPositionField()}
          {this.renderPasswordField()}
          {this.renderConfirmPasswordField()}
          <button type="submit" className="register-button">
            Register
          </button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default RecruiterRegister