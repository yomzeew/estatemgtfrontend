import React from 'react';

function Loginpage() {
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

          </div>
          
       

        </div>
        

      </div>
    
  );
}

export default Loginpage;
