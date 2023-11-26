import React, { useState } from 'react';
import Loader from './loader';

function Loginpage() {
  const [showpreloader,setshowpreloader]=useState(true)
  return (
    <div className='h-screen w-screen items-center flex-col flex justify-center'>

        <div className=' bg-gradient-to-t from-green-950 to-green-800 h-32 w-full'>

        </div>
        <div className='flex-1 items-center flex justify-center'>
          <div>
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
        <div className='flex justify-center mt-5'>
        <button className='bg-green-950 h-8 rounded-lg text-yellow-500 w-72 md:w-96 '>{showpreloader?<Loader/>:'Login'}</button>


        </div>
       
          </div>
          
          
       

        </div>
        

      </div>
    
  );
}

export default Loginpage;
