import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminAuth.module.scss';
import Swal from 'sweetalert2';

export default function AdminAuth() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'Admin@Password';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (credentials.email === adminEmail && credentials.password === adminPassword) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successful! Welcome to the admin panel.',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/admin');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login failed. Please check your credentials.',
      });
    }
  };

  return (
    <div className={styles['signin-container']}>
      <div className={styles['signin-card']}>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            className={styles['input-field']}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className={styles['input-field']}
            placeholder="Password"
            required
          />
          <button type="submit" className={styles['submit-btn']}>
            Go to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
