// SignUpForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/userSlice';
import styles from './SignUp.module.scss';
const Swal = require('sweetalert2')

export default function SignUp () {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpUser(userData));
    setUserData({ fullName: '', email: '', phone: '', password: '' });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Signup successful! Plese do login ',
      showConfirmButton: false,
      timer: 1500
  })

  navigate('/signin');
  };

  return (
    <div className={styles['signup-container']}>
      <div className={styles['signup-card']}>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            className={styles['input-field']}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className={styles['input-field']}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            className={styles['input-field']}
            placeholder="Phone"
            required
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className={styles['input-field']}
            placeholder="Password"
            required
          />
          <button type="submit" className={styles['submit-btn']}>
            Sign Up
          </button>
        </form>
        <Link to="/signin"> 
            <h6> already have an account? lets signin </h6>
        </Link>
      </div>
    </div>
  );
};

