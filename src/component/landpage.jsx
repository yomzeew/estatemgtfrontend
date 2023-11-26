import React from 'react';
import logo from './images/logo.png'

function Landpage() {
  return (
    <div className="h-screen w-screen bg-gradient-to-t from-green-950 to-green-800 flex justify-center items-center">
        <div><img src={logo} className='md:w-32 w-24 h-auto'/></div>
    
    </div>
  );
}

export default Landpage;
