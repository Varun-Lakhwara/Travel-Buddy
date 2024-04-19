import React from 'react';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
    <Route path='/Journal' element={<Journal/>}/>

   </Routes>
   </BrowserRouter>
  )
}

export default App
