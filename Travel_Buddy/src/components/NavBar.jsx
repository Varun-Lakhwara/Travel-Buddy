import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Button } from "antd";
import ButtonC from "./Button";
import "./Navbar.css";
import Dropdown from "./Dropdown";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <Navbar className="border-b-2 navbar flex">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        Travel Buddy
      </Link>

      {/* Search bar */}
      <form>
        <TextInput
          type="text"
          placeholder="Search.."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      {/* Search button for mobile */}
      <Button
        className="rounded-full px-6 py-2 lg:hidden"
        color="#0e2f44"
        icon={<AiOutlineSearch />}
      ></Button>

      {/* Light/Dark button */}
      <div className="flex gap-2 md:order-2">
        <Button
          className="rounded-full px-4 py-2 hidden sm:inline"
          color="gray"
        >
          <FaMoon />
        </Button>
      </div>

      {/* Signup button */}
      <ButtonC />

      {/* Menu icon for mobile */}
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>

      {/* Navigation menu */}
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li
          className="nav-item"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link
            to="/CreateJournal"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Journal <i className="fas fa-caret-down"></i>
          </Link>
          {dropdown && <Dropdown />}
        </li>
        <li className="nav-item">
          <Link to="/Map" className="nav-links" onClick={closeMobileMenu}>
            Map
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Dashboard"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Notification"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Notifications
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SignUp"
            className="nav-links-mobile"
            onClick={closeMobileMenu}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </Navbar>
  );
}
