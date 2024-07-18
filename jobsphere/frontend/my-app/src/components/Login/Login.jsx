import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios'
import logo from '../../images/logo.png'
import './Login.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    isUserRegistered: false,
  }

  componentDidMount() {
    this.checkUserRegistration()
  }

  checkUserRegistration = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/job-applicants', {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      })
      if (response.status === 200) {
        this.setState({ isUserRegistered: true })
      } else {
        this.setState({ isUserRegistered: false })
      }
    } catch (error) {
      console.error('Error checking registration:', error)
    }
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    const { navigate } = this.props; 
    navigate('/'); 
  }
  

  onFailureLogin = errorMsg => {
    this.setState({ errorMsg, showErrorMsg: true })
  }

  onSubmitForm = async event => {
    console.log("hi")
    event.preventDefault()
    const { email, password, isUserRegistered } = this.state

    if (!isUserRegistered) {
      this.setState({ errorMsg: 'User is not registered. Please register first.', showErrorMsg: true })
      return
    }

    const userDetails = { email, password }
    const LoginApiUrl = 'http://localhost:5000/api/recruiters/login'

    try {
      const response = await axios.post(LoginApiUrl, userDetails)
      console.log(response.data)
      console.log(response.status)
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.replace("/recHome")
      } else {
        this.onFailureLogin(response.data.error_msg)
      }
    } catch (error) {
      console.error('Login error:', error)
      this.onFailureLogin('Something went wrong. Please try again.')
    }
  }

  onSubmitUserForm = async event => {
    
    event.preventDefault()
    const { email, password, isUserRegistered } = this.state

    if (!isUserRegistered) {
      this.setState({ errorMsg: 'User is not registered. Please register first.', showErrorMsg: true })
      return
    }

    const userDetails = { email, password }
    const LoginApiUrl = 'http://localhost:5000/api/job-applicants/login'

    try {
      const response = await axios.post(LoginApiUrl, userDetails)
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.replace("/")
      } else {
        this.onFailureLogin(response.data.error_msg)
      }
    } catch (error) {
      console.error('Login error:', error)
      this.onFailureLogin('Something went wrong. Please try again.')
    }
  }

  updateEmail = event => this.setState({ email: event.target.value })

  updatePassword = event => this.setState({ password: event.target.value })

  renderEmailField = () => {
    const { email } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="email" className="login-input-label">
          EMAIL
        </label>
        <input
          type="text"
          value={email}
          className="login-input-field"
          placeholder="Enter your email"
          id="email"
          onChange={this.updateEmail}
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
          onChange={this.updatePassword}
          required
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken) {
      return <Navigate to="/" />
    }

    const { errorMsg, showErrorMsg } = this.state

    return (
      <div className="login-container">
        <form className="login-form" >
          <img
            src={logo}
            alt="website logo"
            className="website-logo-login-form"
          />
          {this.renderEmailField()}
          {this.renderPasswordField()}
          <div>
            <button type="submit" className="login-button" onClick={this.onSubmitForm}>
              Login as Recruiter
            </button>
            <button type="submit" className="login-button" onClick={this.onSubmitUserForm} >
              Login as Applicant
            </button>
            {showErrorMsg && <p className="error-msg">* {errorMsg}</p>}
          </div>
          <p className="register-link">
            Don't have an account? <Link to="/register" className="login-input-label">Register</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Login