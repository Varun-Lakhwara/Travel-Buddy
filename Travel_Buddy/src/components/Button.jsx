import React from "react";
import './button.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { MdExitToApp } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';


export default function Button() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {currentUser ? (
        <Dropdown arrowIcon={false} inline label = {
          <Avatar alt="user" img={currentUser.profilePicture} rounded/>
        }>
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
          </Dropdown.Header>
          <Link to={'/dashboard?tab=profile'}>
          <Dropdown.Item><AiOutlineUser className="mr-2 w-6 h-5"/>Profile</Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item><MdExitToApp className="mr-2 w-6 h-5"/>Sign out</Dropdown.Item>
          </Link>
          

        </Dropdown>
      ) : (
        <Link to="/SignIn">
          <button className="btn">Sign In</button>
        </Link>
      )}
    </>
  );
}
