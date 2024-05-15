import React from "react";
import "./button.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { MdExitToApp } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Button() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">
              {currentUser.email}
            </span>
          </Dropdown.Header>
          <Link to={"/dashboard?tab=profile"}>
            <Dropdown.Item>
              <AiOutlineUser className="mr-2 w-6 h-5" />
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick= {handleSignout}>
              <MdExitToApp className="mr-2 w-6 h-5" />
              Sign out
            </Dropdown.Item>
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
