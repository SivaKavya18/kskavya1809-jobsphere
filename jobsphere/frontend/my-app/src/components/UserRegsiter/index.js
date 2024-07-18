import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Navigate,Link } from 'react-router-dom'
import './index.css'
import logo from '../../images/logo.png'
import axios from 'axios'

class UserRegister extends Component {
  state = {
    firstName: '',
    lastName:'',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    resume: '',
    cover_letter: '',
    skills: [],
    experience: [], 
    education: [], 
    errorMsg: '',
    showErrorMsg: false,
  }

  onSuccessRegister = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    const { navigate } = this.props
    navigate('/')
  }

  onFailureRegister = errorMsg => {
    console.log(errorMsg)
    this.setState({ errorMsg, showErrorMsg: true })
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      phone,
      street,
      city,
      state,
      zip_code,
      country,
      resume,
      cover_letter,
      skills,
      experience,
      education,
    } = this.state

    const userDetails = {
      first_name:firstName,
      last_name:lastName,
      email,
      phone,
      address: { street, city, state, zip_code, country },
      resume,
      cover_letter,
      skills,
      experience,
      education,
      password,
      confirm_password: confirmPassword
    }

    try {
        const response = await axios.post('http://localhost:5000/api/job-applicants', userDetails)
        if (response.status === 200) {
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

  handleExperienceChange = (index, event) => {
    const { name, value } = event.target
    const { experience } = this.state
    experience[index][name] = value
    this.setState({ experience })
  }

  handleAddExperience = () => {
    const { experience } = this.state
    experience.push({ company_name: '', job_title: '', start_date: '', end_date: '', description: '' })
    this.setState({ experience })
  }

  handleRemoveExperience = index => {
    const { experience } = this.state
    experience.splice(index, 1)
    this.setState({ experience })
  }

  handleEducationChange = (index, event) => {
    const { name, value } = event.target
    const { education } = this.state
    education[index][name] = value
    this.setState({ education })
  }

  handleAddEducation = () => {
    const { education } = this.state
    education.push({ institution_name: '', degree: '', field_of_study: '', start_date: '', end_date: '' })
    this.setState({ education })
  }

  handleRemoveEducation = index => {
    const { education } = this.state
    education.splice(index, 1)
    this.setState({ education })
  }

  renderfirstNameField = () => {
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
          placeholder="Enter your username"
          id="firstName"
          onChange={this.handleChange}
          required
        />
      </div>
    )
  }

  renderlastNameField = () => {
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
          placeholder="Enter your username"
          id="lastName"
          onChange={this.handleChange}
          required
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
  rendeConfirmPasswordField = () => {
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
          placeholder="Enter your password"
          id="confirmPassword"
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

  renderAddressFields = () => {
    const { street, city, state, zip_code, country } = this.state
    return (
      <div>
        <div className="input-field-container">
          <label htmlFor="street" className="login-input-label">
            STREET
          </label>
          <input
            type="text"
            value={street}
            className="login-input-field"
            placeholder="Enter your street address"
            id="street"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="city" className="login-input-label">
            CITY
          </label>
          <input
            type="text"
            value={city}
            className="login-input-field"
            placeholder="Enter your city"
            id="city"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="state" className="login-input-label">
            STATE
          </label>
          <input
            type="text"
            value={state}
            className="login-input-field"
            placeholder="Enter your state"
            id="state"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="zip_code" className="login-input-label">
            ZIP CODE
          </label>
          <input
            type="text"
            value={zip_code}
            className="login-input-field"
            placeholder="Enter your zip code"
            id="zip_code"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="country" className="login-input-label">
            COUNTRY
          </label>
          <input
            type="text"
            value={country}
            className="login-input-field"
            placeholder="Enter your country"
            id="country"
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }

  renderResumeField = () => {
    const { resume } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="resume" className="login-input-label">
          RESUME URL
        </label>
        <input
          type="text"
          value={resume}
          className="login-input-field"
          placeholder="Enter URL to your resume"
          id="resume"
          onChange={this.handleChange}
        />
      </div>
    )
  }

  renderCoverLetterField = () => {
    const { cover_letter } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="cover_letter" className="login-input-label">
          COVER LETTER URL
        </label>
        <input
          type="text"
          value={cover_letter}
          className="login-input-field"
          placeholder="Enter URL to your cover letter"
          id="cover_letter"
          onChange={this.handleChange}
        />
      </div>
    )
  }

  renderSkillsField = () => {
    const { skills } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="skills" className="login-input-label">
          SKILLS (comma-separated)
        </label>
        <input
          type="text"
          value={skills.join(',')}
          className="login-input-field"
          placeholder="Enter your skills"
          id="skills"
          onChange={this.handleSkillsChange}
        />
      </div>
    )
  }

  handleSkillsChange = event => {
    const skills = event.target.value.split(',')
    this.setState({ skills: skills.map(skill => skill.trim()) })
  }

  renderExperienceFields = () => {
    const { experience } = this.state
    return (
      <div>
        <h3 className="login-input-label">Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <input
              type="text"
              placeholder="Company Name"
              value={exp.company_name}
              onChange={event => this.handleExperienceChange(index, event)}
              name="company_name"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={exp.job_title}
              onChange={event => this.handleExperienceChange(index, event)}
              name="job_title"
            />
            <input
              type="text"
              placeholder="Start Date"
              value={exp.start_date}
              onChange={event => this.handleExperienceChange(index, event)}
              name="start_date"
            />
            <input
              type="text"
              placeholder="End Date"
              value={exp.end_date}
              onChange={event => this.handleExperienceChange(index, event)}
              name="end_date"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={event => this.handleExperienceChange(index, event)}
              name="description"
            />
            <button type="button" onClick={() => this.handleRemoveExperience(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddExperience} className="add-button">
          Add Experience
        </button>
      </div>
    )
  }

  renderEducationFields = () => {
    const { education } = this.state
    return (
      <div>
        <h3 className="login-input-label">Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <input
              type="text"
              placeholder="Institution Name"
              value={edu.institution_name}
              onChange={event => this.handleEducationChange(index, event)}
              name="institution_name"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={event => this.handleEducationChange(index, event)}
              name="degree"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.field_of_study}
              onChange={event => this.handleEducationChange(index, event)}
              name="field_of_study"
            />
            <input
              type="text"
              placeholder="Start Date"
              value={edu.start_date}
              onChange={event => this.handleEducationChange(index, event)}
              name="start_date"
            />
            <input
              type="text"
              placeholder="End Date"
              value={edu.end_date}
              onChange={event => this.handleEducationChange(index, event)}
              name="end_date"
            />
            <button type="button" onClick={() => this.handleRemoveEducation(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddEducation} className="add-button">
          Add Education
        </button>
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
          <h1>User Register</h1>
          
          {this.renderfirstNameField()}
          {this.renderlastNameField()}
          {this.renderEmailField()}
          {this.renderPasswordField()}
          {this.rendeConfirmPasswordField()}
          
          {this.renderPhoneField()}
          {this.renderAddressFields()}
          {this.renderResumeField()}
          {this.renderCoverLetterField()}
          {this.renderSkillsField()}
          {this.renderExperienceFields()}
          {this.renderEducationFields()}
          <button type="submit" className="register-button">
            Register
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default UserRegister