import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Assuming you have existing CSS styling in this file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Correct hook for React Router v6

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Dummy login success
    setErrorMessage('');  // Clear any previous error message
    // After successful login, redirect to the homepage
    navigate('/home');  // Redirect to homepage
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login to Your Account</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup" className="footer-link">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
