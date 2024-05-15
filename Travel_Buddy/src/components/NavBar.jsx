import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, TextInput, Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import ButtonC from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function NavBar() {
  const path = useLocation().pathname; 
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [ searchTerm, setSearchTerm ] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  console.log(searchTerm);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search]
)

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/Search?${searchQuery}`);
  }

  return (
    <Navbar className="border-b-2">
      <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white gap-2 ">Travel</span>
        Buddy
      </Link>

      <form onSubmit={handleSubmit}>
        <TextInput 
        type="text"
        placeholder="Search.."
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 flex items-center lg:hidden" color='gray' pill >
        <AiOutlineSearch/>
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 flex items-center hidden sm:inline" color='gray' pill onClick = { () => dispatch(toggleTheme())}>
          { theme === 'light' ? <FaMoon/> : <FaSun/> }
        </Button>

        <ButtonC/>
        
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active= {path === '/'} as={'div'}>
          <Link to='/' >Home</Link>
        </Navbar.Link>

        <Navbar.Link active= {path === '/CreateJournal'} as={'div'}>
          <Link to='/CreateJournal' >Journal</Link>
        </Navbar.Link>

        <Navbar.Link active= {path === '/Dashboard'} as={'div'}>
          <Link to='/Dashboard'>Dashboard</Link>
        </Navbar.Link>

        <Navbar.Link active= {path === '/About'} as={'div'}>
          <Link to='/About'>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
