import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
  <Link to='/SignUp'>
  <button className='btn'>Sign Up</button>
  </Link>
  )
}
