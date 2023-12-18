import { useEffect, useState } from 'react'
import api from '../../api/api'
import house from '../image/Real-Estate-2.jpg'
const TenantPaymentRecord=()=>{
    const [data,setdata]=useState([])
    const [datatenant,setdatatenant]=useState([])
    const [datapayment,setdatapayment]=useState([])
    const [dataproperty,setdataproperty]=useState([])
    const [showdialogbox,setshowdialogbox]=useState(false)
    const [tenantid,settenantid]=useState('')
    const [advancefees,setadvancefees]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const [totalfees,settotalfees]=useState('')
    const [propertid,setpropertyid]=useState('')
    const fetchdata=async()=>{
       try{
        const response=await api.get('/api/selectallrent')
        const datares=response.data.data
        console.log(datares)
        setdata(datares)

       }catch(error){
        

       } 
    }
    const fetchtenant=async()=>{
        try{
            const response=await api.get('/api/selectall')
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdatatenant(datares)

            }
            else{
                setdatatenant([])
            }
          


        }catch(error){

        }
    }
    const fetchpayment=async()=>{
        try{
            const response=await api.get('/api/selectallpayment')
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdatapayment(datares)

            }
            else{
                setdatapayment([])
            }
          


        }catch(error){

        }
    }
    const fetchproperty=async()=>{
        try{
            const response=await api.get('/api/selectproperty')
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdataproperty(datares)

            }
            else{
                setdataproperty([])
            }
          


        }catch(error){

        }
    }
    
    
    useEffect(()=>{
        fetchproperty()
        fetchpayment()
        fetchtenant()
        fetchdata()
        

    },[])
    const handlepay=(x,y,z)=>{
        setshowdialogbox(true)
        settenantid(x)
        settotalfees(y)
        setpropertyid(z)
        

    }
    const handleaddpay=async()=>{

        if(!advancefees){
            seterrormessage('Enter Amount');
            return
        };
            const response=await api.get('/api/selectallrent')
            const datares=response.data.data
            const datauser=datares.filter((item)=>(
                item.tenant_id===tenantid
            
                ))
            const agentfee=datauser[0].agent_fees
            const rentfee=datauser[0].rent_fees
            const agreementfees=datauser[0].agreement
            //check paymentstatus
            let paymentstatus
            if(advancefees<totalfees){
                paymentstatus='incomplete'

            }
            else{
                paymentstatus='complete'
            }
            const getrentfee=JSON.parse(advancefees)-((JSON.parse(agentfee))+(JSON.parse(agreementfees)))
            //GET DAYS
            const noofyear=getrentfee/rentfee
            const noofdays=noofyear*365
            const getyear=new Date().getFullYear()
            const getmonth=new Date().getMonth()+1
            const getdate=new Date().getDate()
            const payment_date=getyear+"-"+getmonth+"-"+getdate
        const data={tenant_id:tenantid,total_fees:totalfees,advance_payment:advancefees,rent_days:noofdays,payment_status:paymentstatus,payment_date:payment_date}
    }
    

    return(
        <div>
            <div className="w-64 md:w-550">
                
                <div>
                <div className='mb-3'>
                <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                <input placeholder='search by name or tenant id' className="md:w-96 w-56 h-8 outline-0 border rounded-2xl px-7"/>
            </div>
            <div className='flex justify-center'>
            {showdialogbox &&<div className='absolute bg-white rounded-lg h-44 top-40 w-64 md:w-72 flex flex-col justify-center items-center'>
                <div className='px-3'>
                    <div className='text-sm text-red-500'>{errormessage}</div>
                    <div className='flex justify-between'>
                        <div>Tenant ID:#{tenantid}</div>
                        <div><i onClick={()=>setshowdialogbox(false)} class="fa fa-times-circle cursor-pointer  text-red-500" aria-hidden="true"></i></div>

                        </div>
                    <div className='mt-5'>Enter Amount</div>
                    <input onChange={(e)=>{setadvancefees(e.target.value)}} className='h-8 w-full outline-0 border' />
                    <div className='flex justify-center'>
                    <button onClick={handleaddpay} className='bg-yellow-500 text-green rounded-xl h-8 w-44 mt-3'>Submit</button>

                    </div>
                    

                </div>
                 

                </div>}

            </div>
           
                <div className="border border-black border-dashed rounded-2xl h-567 overflow-y-scroll   px-3 ">
                <div className="justify-center flex">
                <div className="bg-green-900 w-64 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Tenant Payment Record
                </div>
             
                </div>
                {data.length>0&&data.map((item,index)=>{
                    const tenant_id=item.tenant_id
                    const agreementfees=item.agreement
                    const agent_fees=item.agent_fees
                    const rentfee=item.rent_fees
                    let noofdays=0
                    let item_payment=null
                    let propertyimage
                    if (dataproperty.length>0){
                        const dataproper=dataproperty.filter((item)=>(
                            dataproperty.id===item.property_id
                        ))
                        const image=JSON.parse(dataproper[0].images_base64)
                        propertyimage=image[0]

                    }
                  
                    if(datapayment.length>0){
                       const datatranc=datapayment.filter((item)=>(
                            item.tenant_id===tenant_id
                        ))
                    const advancefees=JSON.parse(datatranc[0].advance_payment)
                    if (advancefees>0){
                        const rentfeeremain=advancefees-agent_fees-agreementfees
                        const geteachmonth=(rentfeeremain/rentfee) *12
                        noofdays=geteachmonth*30


                    }
                    }
                   
                    if(item.payment_date!==''){
                       
                        item_payment=new Date(item.payment_date).getTime()

                    }
                  
                    const datauser=datatenant.filter((item)=>(
                        item.id===tenant_id
                    ))
                    const firstname=datauser[0].firstname
                    const lastname=datauser[0].lastname


                    return(
                        <div className='h-96 overflow-y-scroll mt-3 py-5 rounded-2xl bg-slate-200 px-3'>
                        <div className='flex justify-center'>
                        <img src={propertyimage} className='h-44 object-contain ' />
                        </div>
                        <div className='flex justify-between text-green-900'>
                        <div>Property ID: #{item.property_id}</div>
                        <div>Tenant ID: #{item.tenant_id}</div>
                        </div>
                        <div>
                            <div><span className='font-bold'>Name:</span> <span className='text-xl'>{lastname} {firstname}</span></div>
                            <div className='flex justify-between text-sm flex-wrap'>
                            <div>
                                <span className=''>Payment Status:</span><span className='bg-red-500 text-white'>{item.payment_status}</span>
                                </div>
                            <div>
                                <span className=''>Rent Payment Date:{item.payment_date===null?0:item.payment_date}</span><span></span>
                                </div>
    
                            </div>
                            <div className='flex justify-between text-sm flex-wrap '>
                            <div><span className=''>Rent Days:</span><span>{noofdays}day(s)</span></div>
                            <div><span className=''>Total fees:</span><span>{item.total_fees}</span></div>
                            </div>
                            <div><span className=''>Advance fees:</span><span>0</span></div>
                            <div className='flex justify-between'>
                            <button onClick={()=>handlepay(item.tenant_id,item.total_fees,item.property_id)} className='bg-green-900 text-white w-56 h-8 rounded-lg text-xs'>Make Payment</button>
                            <button  className='bg-green-900 text-white w-56 rounded-lg text-xs h-8'>Send Agreement</button>
    
                            </div>
                            
                        </div>
                       
                    </div>

                    )
                })
               }
                <div className='h-96 overflow-y-scroll mt-3 py-5 rounded-2xl bg-slate-200 px-3'>
                    <div className='flex justify-center'>
                    <img src={house} className='h-44 object-contain ' />
                    </div>
                    <div className='flex justify-between text-green-900'>
                    <div>Property ID: #20</div>
                    <div>Tenant ID: #1</div>
                    </div>
                    <div>
                        <div><span className='font-bold'>Name:</span> <span className='text-xl'>Oluwasuyi Babayomi</span></div>
                        <div className='flex justify-between text-sm flex-wrap'>
                        <div>
                            <span className=''>Payment Status:</span><span className='bg-red-500 text-white'>Unpaid</span>
                            </div>
                        <div>
                            <span className=''>Rent Due Date:</span><span></span>
                            </div>

                        </div>
                        <div className='flex justify-between text-sm flex-wrap '>
                        <div><span className=''>Rent Days:</span><span>0day(s)</span></div>
                        <div><span className=''>Total fees:</span><span>N128,0000</span></div>
                        </div>
                        <div><span className=''>Advance fees:</span><span>0</span></div>
                        <div className='flex justify-center'>
                        <button className='bg-green-900 text-white w-56 rounded-lg'>Make Payment</button>

                        </div>
                        
                    </div>
                   
                </div>

                </div>

                </div>
           
                </div>

        </div>
    )
}
export default TenantPaymentRecord