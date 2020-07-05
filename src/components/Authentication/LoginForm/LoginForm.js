import React, { useState } from 'react';
import '../Authentication.css';
import { Link } from 'react-router-dom';

function LoginForm({ login }) {
  const userData = {
    username: '',
    password: ''
  };

  const [form, setForm] = useState(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="AuthFormWrapper">
      <h2>Login</h2>
      <form className="AuthForm" onSubmit={handleSubmit}>
        <input
          className="RegisterField"
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="RegisterField"
          type="text"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button className="authButton">Login</button>
        <div className="AuthFooter">
          <span>
            Don't have account yet? <Link to="/register"> Register here</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
