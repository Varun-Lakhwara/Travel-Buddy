import React from 'react';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import CreateJournal from './pages/CreateJournal';
import EditJournal from './pages/EditJournal';

function App() {

  return (
   <BrowserRouter>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
    <Route path='/CreateJournal' element={<CreateJournal/>}/>
    <Route path='/EditJournal' element={<EditJournal/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
