import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [user, setUsername] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation for special characters in first name and last name
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(fname)) {
      setError('First name can only contain letters.');
      return;
    }

    if (!nameRegex.test(lname)) {
      setError('Last name can only contain letters.');
      return;
    }

    // Validation for special characters in username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(user)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    }

    try {
      const response = await axios.post('http://20.247.172.63:5000/register', { 
        user, 
        pwd, 
        fname, 
        lname 
      });
      
      console.log(response.data);
      // Handle successful registration, e.g., redirect to login page
      window.location.href = '/login'; // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
    <div className='registerPage'>
      <h2 className='registerHeader'>Register</h2>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={handleSubmit} className='registerForm'>
        <div className='formGroup'>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={fname}
            onChange={handleFirstNameChange}
            required
            className='formInput'
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lname}
            onChange={handleLastNameChange}
            required
            className='formInput'
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user}
            onChange={handleUsernameChange}
            required
            className='formInput'
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={handlePasswordChange}
            required
            className='formInput'
          />
        </div>
        <button type="submit" className='registerButton'>Register</button>
      </form>
      <p className='registerPrompt'>
        Already have an account? <Link to="/login" className='registerLink'>Login</Link>
      </p>
    </div>
    </div>
  );
}

export default RegisterForm;
