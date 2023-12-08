import upside from '../images/top2.png'
import api from '../api/api'
import { useState,useEffect } from 'react'
import Error404 from '../error/error404'
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from '../loader'
const Dashbaordclient = () => {
    const navigate=useNavigate()
    const [authcheck,setauthcheck]=useState(null)
    const auth=localStorage.getItem('myvaluetwo')
    const [firstname,setfirstname]=useState('')
    useEffect(() => {
        const handlePopstate = (event) => {
          if(localStorage.getItem('myvalue')){
            localStorage.removeItem('myvalue')
          }  
        };
        window.addEventListener('popstate', handlePopstate);
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
      }, [])
    
    const handlefetch=async()=>{
        if(auth){
                 const data={value:auth}
                 try{
                     const response=await api.post('/api/selectclient',data)
                     const check=response.data.message
                     const datares=response.data.data
                     setfirstname(datares.firstname)
                     console.log(check)
                     if(check===true){
                         setauthcheck(true)
                         localStorage.setItem('newauth',auth)
                         
                     }
                     else{
                         setauthcheck(false)
                     }
         
                 }
                 catch(error){
                     console.error(error)
                 }
       
             }
             else{
               setauthcheck(false)
       
             }
       
         
             
       
         }
         useEffect(()=>{
           handlefetch()
       
       
         },[])
         const handlelogout=()=>{
            localStorage.removeItem('myvalue')
            navigate('/loginpage')
            
         }
         if (authcheck === null) {
            // Loading state, you can render a loader or some indicator here
            return <div className='flex justify-center items-center h-screen w-screen'><Loader/></div>;
          }
        
    

    return authcheck? (
        <div className="w-screen h-screen relative">
            <div>
                <div className="absolute w-screen top-0 -z-50">
                <div className='flex justify-end'>
                    <img src={upside} className='md:w-96 w-56' />
                </div>

            </div>
            <div className='flex justify-between px-5 py-5'>
                <div className='text-green-600'>Settings</div>
                <div className='text-green-900'><i class="fa fa-inbox" aria-hidden="true"></i>Inbox</div>

            </div>
            <div className='px-10'>
                Hi {firstname.toUpperCase()}
                <div className='border-b-2 border-green-800 w-10'></div>
                <div className='mt-7 flex justify-center'>
                    <div>
                        <div>
                            Property Address
                        </div>
                        <div className="w-72 h-16 border border-dashed border-slate-600 flex justify-center items-center rounded-lg">
                            <div>7 wuse Street, Abuja Nigeria</div>

                        </div>


                    </div>

                </div>
                <div className='flex justify-center'>
                    <div>
                        <div className='text-xs text-green-900'>Amount due</div>
                        <div className='h-12 md:w-80 w-64 items-center flex justify-center border border-dashed'>
                            <span className='text-xl text-green-900'>N125,000</span>

                        </div>
                    </div>


                </div>
                <div className='flex justify-center mt-3'>
                    <div>
                            
                    <button className='bg-green-900 h-8 w-64 text-center rounded-lg text-white'>
                            Check Expenses
                        </button>


                    </div>

                </div>
                <div className='flex justify-center mt-3'>
                    <div>
                    <div className=' bg-yellow-500  h-8 w-64 text-center rounded-lg text-white'>
                           Statement of Account
                        </div>
                        <div className='h-32 bg-slate-200 md:w-80 w-64 items-center flex justify-center border border-dashed'>

                        </div>
                    </div>
                </div>
                
                <div  className='mt-2 flex justify-center'>
                        <button>
                            <span className='text-lg'> Check Receipt/Invoice </span>
                            <div className='border-b-2 border-green-800 w-16'></div>

                        </button>
                        </div>
                <div className='mt-3 flex justify-center'>
                <button onClick={handlelogout} className='bg-yellow-500 h-8 w-56 text-center rounded-lg text-white'>Logout</button>
            </div>
                
            </div>

            </div>
            





        </div>
    ):(
        <div><Navigate to="/client/loginpage" replace  /></div>
    )
}
export default Dashbaordclient