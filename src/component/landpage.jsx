import React, { useEffect } from 'react';
import logo from './images/logo.png'
import Loader from './loader';
import { useNavigate } from 'react-router-dom';

function Landpage() {
    const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/loginpage');
    }, 3000);

    // Clear the timeout if the component unmounts before it fires
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs once on mount
  return (
    <div className="h-screen w-screen bg-gradient-to-t from-green-950 to-green-800 flex justify-center items-center">
        <div><img src={logo} className='md:w-32 w-24 h-auto'/></div>
        
    </div>
  );
}

export default Landpage;
