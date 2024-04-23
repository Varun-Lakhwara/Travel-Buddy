import React from 'react';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Notification from './pages/Notification';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import CreateJournal from './pages/CreateJournal';
import EditJournal from './pages/EditJournal';
import Map from './pages/Maps';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
   <BrowserRouter>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Notification' element={<Notification/>}/>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Route> 
    <Route path='/CreateJournal' element={<CreateJournal/>}/>
    <Route path='/EditJournal' element={<EditJournal/>}/>
    <Route path='/Map' element={<Map/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
   </Routes>
   <Footer/>
   
   </BrowserRouter>
  )
}

export default App
