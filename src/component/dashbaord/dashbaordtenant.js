import upside from '../images/topimage.png'
import api from '../api/api'
import { useState,useEffect } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import Loader from '../loader'
const Dashbaordtenant = () => {
    const navigate=useNavigate()
    const [authcheck,setauthcheck]=useState(null)
    const auth=localStorage.getItem('myvalue')
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
                     const response=await api.post('/api/selectuser',data)
                     const check=response.data.message
                     
                     console.log(check)
                     if(check===true){
                        const datares=response.data.data
                     setfirstname(datares.firstname)
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
         
    

    return authcheck?(
           <div className="w-screen h-screen relative">
            <div>
                <div className="absolute w-screen top-0 -z-50">
                <div className='flex justify-end'>
                    <img src={upside} className='md:w-96 w-56' />
                </div>

            </div>
            <div className='flex justify-between px-5 py-5'>
                <div className='text-green-600'>Settings</div>
                <div className='text-white'><i class="fa fa-inbox" aria-hidden="true"></i>Inbox</div>

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
                    <div className='items-center justify-center text-white text-xl  flex  h-36 w-36 rounded-full border-8 border-yellow-500 mt-5 bg-green-900'>
                        <div>
                            <div className='text-center'>365<span className='text-xs'>days</span></div>
                            <div className='text-center'>left</div>
                        </div>

                    </div>


                </div>
                <div className='flex  justify-center mt-5'>
                <div className='md:w-96 w-72 h-56 border-2 border-dashed bg-slate-200 px-3'>
                    <div className='flex mt-3'>
                        <div className='w-1/2'>
                        <div className="text-xs">Due Amount:</div>
                        <div className='h-8 rounded-lg  border-dashed border-2 bg-white'>
                            N165,000
                        </div>

                        </div>
                        
                        <div className='w-1/2'>
                        <div className="text-xs">Due Date:</div>
                        <div className='h-8 rounded-lg text-xs text-center text-red-500  border-dashed border-2 bg-white'>
                            12 December,2024
                        </div>

                        </div>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <div>
                        <div className='text-sm'>Rent Payment Status</div>
                        <div className='bg-green-900 h-8 w-64 text-center rounded-lg text-white'>
                            Paid
                        </div>
                        </div>
                        
                    </div>
                        <div  className='mt-2 flex justify-center'>
                            
                        <button className='bg-yellow-500 h-8 w-56 text-center rounded-lg text-white'>
                            Check Pending Fees

                        </button>
                        

                        </div>
                        <div  className='mt-2 flex justify-center'>
                        <button>
                            <span className='text-lg'> Check Receipt/Invoice </span>
                            <div className='border-b-2 border-green-800 w-16'></div>

                        </button>
                        </div>
             

                        
                       


                        
                </div>
              
                  

                </div>
                <div className='mt-3 flex justify-center'>
                <button onClick={handlelogout} className='bg-yellow-500 h-8 w-56 text-center rounded-lg text-white'>Logout</button>
            </div>
                
            </div>

            </div>
            





        </div>
       
    ):(
        <div><Navigate to="/loginpage" replace  /></div>

        
    )
}
export default Dashbaordtenant