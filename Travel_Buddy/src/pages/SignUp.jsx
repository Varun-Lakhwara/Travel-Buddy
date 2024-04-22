import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Label, TextInput, Button, Alert, Spinner} from 'flowbite-react';
import OAuth from '../components/OAuth';

export default function SignUp() {

  const [formData,setFormData] = useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id] : e.target.value.trim() });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if( !formData.username || !formData.email || !formData.password ){
      return setErrorMessage("Please fill out all fields.");
    }

    try{
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/Signup',{
        method : 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/SignIn');
      }

    }
    catch(error){
      setErrorMessage(error.message);
      setLoading(false);
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
         <p className='text-sm mt-5 font-semibold'> Make your Travel Experience Exceptional.</p>
          </div>

          {/* Right */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Username'/>
                <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
                required
                />
              </div>

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
                placeholder='Password'
                id='password'
                onChange={handleChange}
                required/>
              </div>

              <Button gradientMonochrome='teal' type='submit' disabled={loading}>{
              loading ? (<>
              <Spinner size='sm'/>
              <span className='pl-3'>Loading..</span>
              </>
            ): 'Sign Up'
              }</Button>
              <OAuth/>

            </form>
            
            <div className="flex gap-2 mt-5">
              <span>Have an account?</span>
              <Link to='/SignIn' className=' text-blue-400' > Sign In</Link>
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
