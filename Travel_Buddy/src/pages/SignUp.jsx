import React from 'react';
import { Link } from 'react-router-dom';
import {Label, TextInput, Button} from 'flowbite-react';

export default function SignUp() {
  return (
    <>
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* Left */}
        <div className='flex-1'>
        <Link to="/" className="font-bold text-4xl ">
        <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Travel </span>Buddy
         </Link>
         <p className='text-sm mt-5'> Make your Travel Experience Exceptional.</p>
          </div>

          {/* Right */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4'>
              <div>
                <Label value='Username'/>
                <TextInput
                type='text'
                placeholder='Username'
                id='username'
                required
                />
              </div>

              <div>
              <Label value='Email'/>
                <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                required
                />
              </div>

              <div>
              <Label value='Password'/>
                <TextInput
                type='password'
                placeholder='Password'
                id='password'
                required/>
              </div>

              <Button gradientMonochrome='teal' type='submit'>Signup</Button>

            </form>
            
            <div className="flex gap-2 mt-5">
              <span>Have an account?</span>
              <Link to='/SignIn' className=' text-blue-400' > Sign In</Link>
            </div>

          </div>
        </div>
      </div>
    </>

)};
