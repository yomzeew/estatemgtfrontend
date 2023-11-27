import React, { useState } from 'react';
import Loader from './loader';
import logo from './images/logo.png'

function Loginpage() {
  const [showpreloader,setshowpreloader]=useState(false)
  return (
    <div className='h-screen w-screen items-center flex-col flex justify-center'>

        <div className=' bg-gradient-to-t from-green-950 to-green-800 h-32 w-full flex justify-between items-center px-3'>
          <div>
            <span className='fa fa-2x fa-arrow-left text-yellow-500'></span>
          </div>
          <div className='text-white text-xl text-center'>
            Welcome
          </div>
          <div>
            <img src={logo} className='w-16 lg:w-24 h-auto' />

          </div>

        </div>
        <div className='flex-1 items-center flex justify-center'>
          <div>
            <div className='mb-10'>
              <div>Login to your account</div>
              <div className='border-b-green-500 w-14 border-2'></div>
            </div>
          <div>
          <div className='text-sm'>
          Phone Number or Email
        </div>
        <div>
          <input className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'/>
        </div>

          </div>
      
        <div className='mt-3'>
        <div className='text-sm'>
         Passcode:
        </div>
        <div>
          <input className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'/>
        </div>

        </div>
        <div className='font-bold text-sm cursor-pointer'>FORGOT PASSWORD</div>
        <div className='flex justify-center mt-5'>
        <button className='bg-green-950 h-8 rounded-lg text-yellow-500 w-72 md:w-96 '>{showpreloader?<Loader/>:'LOGIN'}</button>
        </div>
        <div className='text-xs text-center mt-5'>I don't have account <span className='font-bold text-sm text-green-950 cursor-pointer'>REGISTER</span></div>
        
          </div>
          
          
       

        </div>
        

      </div>
    
  );
}

export default Loginpage;
