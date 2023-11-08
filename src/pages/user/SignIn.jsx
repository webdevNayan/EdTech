import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../redux/userSlice';
import styles from './SignIn.module.scss';
import Swal from 'sweetalert2';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signInUser(credentials))
      .then((response) => {
        if (response.payload) {
          // Redirect to the course_listing page upon successful login
          // Show an alert upon successful login
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful! Welcome to the course listings.',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/course_listing');

        } else {
          // Show an alert if login fails
          Swal.fire({
            icon: 'error',
            title: 'Login failed. Please check your credentials.',
          });
        }
      })
      .catch((error) => {
        // Handle other errors
        console.error('Error during login:', error);
        Swal.fire({
          icon: 'error',
          title: 'An error occurred during login.',
        });
      });

    setCredentials({ email: '', password: '' });
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
            Sign In
          </button>

          <Link to="/signup">
            <h6> Don't have an account? Let's Sign Up</h6>
          </Link>
        </form>
      </div>
    </div>
  );
}
