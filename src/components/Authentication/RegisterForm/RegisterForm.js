import React, { useState } from 'react';
import '../Authentication.css';
import { Link } from 'react-router-dom';

function RegisterForm({ register }) {
  const registerUser = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  const [form, setForm] = useState(registerUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="AuthFormWrapper">
      <h2>Sign Up</h2>
      <form className="AuthForm" onSubmit={handleSubmit}>
        <input
          className="RegisterField"
          type="text"
          placeholder="username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="RegisterField"
          type="text"
          placeholder="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="RegisterField"
          type="text"
          placeholder="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="RegisterField"
          type="text"
          placeholder="confirm password"
          name="password2"
          value={form.password2}
          onChange={handleChange}
        />
        <button className="authButton">Register</button>
        <div className="AuthFooter">
          <span>
            Already have an account? <Link to="/login"> Login here</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
