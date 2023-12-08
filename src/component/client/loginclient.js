import React, { useEffect, useState } from 'react';
import Loader from '../loader';
import logo from '../images/logo.png'
import topimage from '../images/topforclient.png'
import api from '../api/api'
import { useNavigate } from 'react-router-dom';

function Loginclient() {
  const [showpreloader,setshowpreloader]=useState(false)
  const [value,setvalue]=useState('');
  const [passcode,setpasscode]=useState('')
  const [errormessage,seterrormessage]=useState('')
  const navigate=useNavigate()
  
  
  
  const handlesubmit=async()=>{
    setshowpreloader(true)
    if(!value){
      seterrormessage('fill in the email or mobileno')
      return
    }
    if (!passcode){
      seterrormessage('fill in the passcode')
      return

    }
    const data={value:value,passcode:passcode }
    try{
      const response=await api.post('/api/loginclient',data)
      console.log(response)
      const result=response.data.message
      if (result===true){
        localStorage.setItem('myvaluetwo',value)
        navigate(`/client/dashboardclient`)
        
        setshowpreloader(false)
      }
      else if(result===false){
        seterrormessage('Server Error ')
        setshowpreloader(false)
      }
      else{
        seterrormessage('Email|Mobileno or Passcode not exist')
        setshowpreloader(false)

      }
     

    }catch(error){
      console.error(error)
    }
  }
  const handleregister=()=>{
    navigate('/client/register')
  }
  const handleback=()=>{
    navigate('/')
  }
  return (
    <div className='h-screen w-screen items-center flex-col flex justify-center'>

       
       
                <div className="absolute w-screen top-0 -z-50">
                <div className='flex justify-start'>
                    <img src={topimage} className='md:w-96 w-32' />
                </div>

            </div>
            <div className='w-full flex justify-between items-center px-3'>

          <div>
            <button onClick={handleback}><span className='fa fa-2x fa-arrow-left text-green-500'></span></button>
          </div>
          <div className='text-green-900 text-xl text-center'>
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
            <div className='text-xs text-red-500'>{errormessage}</div>
          <div>
          <div className='text-sm'>
          Phone Number or Email
        </div>
        <div>
          <input 
          onChange={(e)=>setvalue(e.target.value)}
          className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'/>
        </div>

          </div>
      
        <div className='mt-3'>
        <div className='text-sm'>
         Passcode:
        </div>
        <div>
          <input 
          onChange={(e)=>(setpasscode(e.target.value))}
          type='password'
          className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'/>
        </div>

        </div>
        <div className='font-bold text-sm cursor-pointer'>FORGOT PASSWORD</div>
        <div className='flex justify-center mt-5'>
        <button onClick={handlesubmit} className='bg-green-950 h-8 rounded-lg text-yellow-500 w-72 md:w-96 '>{showpreloader?<Loader/>:'LOGIN'}</button>
        </div>
        <div className='text-xs text-center mt-5'>I don't have account <button onClick={handleregister} className='font-bold text-sm text-green-950 cursor-pointer'>REGISTER</button></div>
        
          </div>
          
          
       

        </div>
        

      </div>
    
  );
}

export default Loginclient;
