import React, {useState} from 'react';
import './Navbar.css';
import Dropdown from './Dropdown';
import { Link }  from 'react-router-dom';
import Button from './Button';

export default function NavBar() {
  const [click,setClick] = useState(false);
  const [dropdown,setDropdown] = useState(false);
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
    <nav className='navbar'>
      <Link to='' className='navbar-logo'>
        Travel Buddy
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to='/Journal' className='nav-links' onClick={closeMobileMenu}>
            Journal <i className='fas fa-caret-down'></i>
          </Link>
          {dropdown && <Dropdown/>}
        </li>
        <li className='nav-item'>
          <Link to='/Map' className='nav-links' onClick={closeMobileMenu}>Map</Link>
        </li>
        <li className='nav-item'>
          <Link to='/Dashboard' className='nav-links' onClick={closeMobileMenu}>Dashboard</Link>
        </li>
        <li className='nav-item'>
          <Link to='/Notifications' className='nav-links' onClick={closeMobileMenu}>Notifications</Link>
        </li>
        <li className='nav-item'>
          <Link to='/Signup' className='nav-links-mobile' onClick={closeMobileMenu}>Sign Up</Link>
        </li>
      </ul>
      <Button/>
    </nav>
    </>
     
  );  
}
