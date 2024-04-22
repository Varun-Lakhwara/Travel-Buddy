import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Label, TextInput, Button, Alert, Spinner} from 'flowbite-react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'; 

export default function SignIn() {

  const [formData,setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if( !formData.email || !formData.password ){
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/Signin',{
        method : 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false){
        dispatch(signInFailure(data.message));
      }
     
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }

    }
    catch(error){
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <>
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* Left */}
        <div className='flex-1'>
        <Link to="/" className="font-bold text-5xl ">
        <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Travel </span>Buddy
         </Link>
         <p className='text-sm mt-5 font-semibold'> Make Your Travel Experience Exceptional.</p>
          </div>

          {/* Right */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

              <div>
              <Label value='Email'/>
                <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={handleChange}
                required
                />
              </div>

              <div>
              <Label value='Password'/>
                <TextInput
                type='password'
                placeholder='*********'
                id='password'
                onChange={handleChange}
                required
                />
              </div>

              <Button gradientMonochrome='teal' type='submit' disabled={loading}>{
              loading ? (<>
              <Spinner size='sm'/>
              <span className='pl-3'>Loading..</span>
              </>
            ): 'Sign In'
              }</Button>

            </form>
            
            <div className="flex gap-2 mt-5">
              <span>Don't have an account?</span>
              <Link to='/SignUp' className=' text-blue-400' > Sign Up</Link>
            </div>

            {
              errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </>

)};
