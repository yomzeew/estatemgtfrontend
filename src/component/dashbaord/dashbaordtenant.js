import upside from '../images/topimage.png'
import api from '../api/api'
import { useState,useEffect } from 'react'
import { useNavigate,Navigate, useActionData } from 'react-router-dom'
import Loader from '../loader'
import Receipt from '../admin/receipt/receipt'
import DisplayInbox from '../inboxmessage/displayinboxmessage'
import ViewNotice from '../inboxmessage/viewNotice.'
import Settings from './settings'
const Dashbaordtenant = () => {
    const navigate=useNavigate()
    const [authcheck,setauthcheck]=useState(null)
    const [tenantid ,settenantid]=useState('')
    const auth=localStorage.getItem('myvalue')
    const [address, setaddress]=useState('')
    const [duedate,setduedate]=useState('')
    const [paymentStatus,setpaymentStatus]=useState('')
    const [firstname,setfirstname]=useState('')
    const [rentdays,setrentdays]=useState('')
    const [totalfees,settotalfees]=useState('')
    const [propertid,setpropertyid]=useState('')
    const [agentfees,setagentfees]=useState('');
    const [agreement,setagreement]=useState('')
    const[description,setdescription]=useState('')
    const[paymentdate,setpaymentdate]=useState('')
    const [Objectdata,setObjectdata]=useState('')
    const [name,setname]=useState('')
    const [showreceipt,setshowreceipt]=useState(false)
    const [showinboxmsg,setshowinboxmsg]=useState(false)
    const [shownotice,setshownotice]=useState(false)
    const [countnotification,setcountnotification]=useState('')
    const [showsetting,setshowsetting]=useState(false)

   

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
                        setname(datares.firstname+' '+datares.lastname)
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
         const getpaymentdetails=async()=>{
            const data={value:auth}
            const response=await api.post('/api/selectrent',data)
            const datares=response.data.data
            console.log(datares)

            const tenant_id=datares.tenant_id
            settenantid(tenant_id)

            const property_id=datares.property_id
            setpropertyid(property_id)

            const responsestwo=await api.get(`/api/selectpropertybyid/${property_id}`)
            const datarestwo=responsestwo.data.data
            console.log(datarestwo)
           setaddress(datarestwo.property_address)
           setagentfees(datarestwo.agent_fees)
           setagreement(datarestwo.agreement)
           setdescription(datarestwo.description)
            const responsethree=await api.get(`/api/selectpayment/${tenant_id}`)
            const dataresthree=responsethree.data.data
             setduedate(dataresthree.due_date)
             const due=dataresthree.due_date
             // get the remain days 
             const timestampforduedate=new Date(due).getTime()
             const currenttimestamp=new Date().getTime()
             const difftime=timestampforduedate-currenttimestamp
             const todays = Math.round(difftime / (24 * 3600 * 1000))
             setrentdays(todays)
             setpaymentdate(dataresthree.payment_date)
             setpaymentStatus(dataresthree.payment_status)
        

             settotalfees(dataresthree.total_fees)
             const reponsefour= await api.get(`/api/checkthedue/${tenant_id}`)
             const dataresfour=reponsefour.data.message
             console.log(dataresfour)

             try{
                const response=await api.get(`/api/getnotifications/${tenant_id}`)
                const datacount=response.data.count
                setcountnotification(datacount)

            }
            catch(error){
                console.error(error)
            }

           

 


         }
         useEffect(()=>{
           handlefetch()
           getpaymentdetails()
           
       
       
         },[])
         
         const handlelogout=()=>{
            localStorage.removeItem('myvalue')
            navigate('/loginpage')
            
         }
         if (authcheck === null) {
            // Loading state, you can render a loader or some indicator here
            return <div className='flex justify-center items-center h-screen w-screen'><Loader/></div>;
          }
          const formatDate = (dateString) => {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
            return formattedDate;
          };
        const generatereceipt=()=>{
            if(paymentStatus==='complete'){
                const rentfees=JSON.parse(totalfees)-(JSON.parse(agentfees))-(JSON.parse(agreement))
                const object={id:tenantid,name:name,address:address,description:description,payment_date:paymentdate,due_date:duedate,rent_fees:rentfees,agent_fees:agentfees,agreement:agreement,total_fees:totalfees}
                setObjectdata(object)
                setshowreceipt(true)
                


            }

          }
          const showinbox=async()=>{
            setshowinboxmsg(true)
            // update
          

          }
          const shownoticefunc=(value)=>{
            setshownotice(value)
            setshowinboxmsg(false)

          }

        
    

    return authcheck?(
           <div className="w-screen h-screen relative">
            {showsetting &&
            <div className='absolute z-50' >
                 <Settings
                 auth={localStorage.getItem('newauth')}
                 showsettings={(value)=>setshowsetting(value)}
                 />
                 </div>

            }
            { shownotice &&
            <div className='absolute z-50'>
                 <div className="flex justify-center">
                    <ViewNotice
                    shownotice={(value)=>shownoticefunc(value)}
                    tenantID={tenantid}
                    
                    />
                </div>
                </div>
           

            }
            
            {showreceipt &&<div className="flex justify-center">
                <div>
                <div className="flex justify-center">

                <button  onClick={()=>setshowreceipt(false)} className="absolute z-50 bg-red-500 text-white px-3 rounded-xl"><i class="fa fa-times" aria-hidden="true"></i>Close</button>
            </div>
           <div className='absolute z-40 left-16 md:left-40 bg-white'>
                
                <div className='overflow-y-scroll'>
                <Receipt
                objectdata={Objectdata}
                
                />  
                    </div>
            
            </div>

                </div>
                </div>
            }
           
            
            <div className={showreceipt?"blur-xl":""}>
                <div className="absolute w-screen top-0 -z-50">
                <div className='flex justify-end'>
                    <img src={upside} className='md:w-96 w-56' />
                </div>

            </div>
            <div className='flex justify-between px-5 py-5'>
                <div onClick={()=>setshowsetting(true)} className='text-green-600'>Settings</div>
                <div onClick={showinbox} className='text-white cursor-pointer'><i class="fa fa-inbox cursor-pointer" aria-hidden="true"></i>Inbox<span className='rounded-full  px-2 py-2 text-xs  bg-red-500 text-white text-center'>{countnotification||0}</span></div>
                {showinboxmsg && <div className='absolute bg-white border border-slate-300 rounded-lg right-5 px-5 py-5'>
                <div>
                <div>

                <button  onClick={()=>setshowinboxmsg(false)} className=" bg-red-500 text-white px-3 rounded-xl"><i class="fa fa-times" aria-hidden="true"></i>Close</button>
            </div>
           <div >
                
                <div className=''>
                    <DisplayInbox
                    shownotice={(value)=>shownoticefunc(value)}
                    tenantId={tenantid}
                    />
                    
                    </div>
            
            </div>

                </div>
                </div>

            }

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
                            <div>{address||'Property Address Not Available'}</div>

                        </div>


                    </div>

                </div>
                <div className='flex justify-center'>
                    <div className='items-center justify-center text-white text-xl  flex  h-36 w-36 rounded-full border-8 border-yellow-500 mt-5 bg-green-900'>
                        <div>
                            <div className='text-center'>{rentdays||0}<span className='text-xs'>days</span></div>
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
                           {totalfees||0}
                        </div>

                        </div>
                        
                        <div className='w-1/2'>
                        <div className="text-xs">Due Date:</div>
                        <div className='h-8 rounded-lg text-xs text-center text-red-500  border-dashed border-2 bg-white'>
                          {formatDate(duedate)||null}
                        </div>

                        </div>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <div>
                        <div className='text-sm'>Rent Payment Status</div>
                        <div className='bg-green-900 h-8 w-64 text-center rounded-lg text-white'>
                            {paymentStatus==='complete'?'Paid':'Incomplete'||'Unpaid'}
                        </div>
                        </div>
                        
                    </div>
                        <div  className='mt-2 flex justify-center'>
                            
                        <button className='bg-yellow-500 h-8 w-56 text-center rounded-lg text-white'>
                            Check Pending Fees

                        </button>
                        

                        </div>
                        <div  className='mt-2 flex justify-center'>
                        {paymentStatus==='complete' &&<button onClick={generatereceipt}>
                            <span className='text-lg'> Check Receipt/Invoice </span>
                            <div className='border-b-2 border-green-800 w-16'></div>

                        </button>}
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