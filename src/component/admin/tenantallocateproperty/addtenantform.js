import { useEffect, useState } from "react"
import api from "../../api/api";


const Addtenantform=({tenantid,backfunc,propertyid})=>{
    const [name,setname]=useState('')
    const [propertyaddress,setpropertyaddress]=useState('');
    
    const [rentfees,setrentfees]=useState('');
    const [agentfees,setagentfees]=useState('');
    const [agreementfees,setagreementfees]=useState('');
    const [errormessage,seterrormessage]=useState('')
    const getaddress=async()=>{
        try{
            const response=await api.get(`/api/selectpropertybyid/${propertyid}`)
            const datares=response.data.data
            setpropertyaddress(datares.property_address)
            setagentfees(datares.agent_fees)
            setagreementfees(datares.agreement)
            setrentfees(datares.rent_fees)
        }catch(error){
            console.error(error)
        }

    }
    useEffect(()=>{
        getaddress()

    },[])
    
    const handlesubmit=async()=>{
        if(!propertyaddress){
            seterrormessage('Please Enter Address')
            return
        }
        if(!rentfees){
            seterrormessage('Please Enter Rent fees ')
            return
        }
        if(!agentfees){
            seterrormessage('Please Enter Agent fees ')
            return
        }
        if(!agreementfees){
            seterrormessage('Please Enter Agreement fees ')
            return
        }
        const total_fees=JSON.parse(rentfees)+JSON.parse(agentfees)+JSON.parse(agreementfees)
        const data={tenant_id:tenantid,property_id:propertyid,rent_fees:JSON.parse(rentfees),agent_fees:JSON.parse(agentfees),agreement:agreementfees,total_fees:JSON.stringify(total_fees),payment_status:'unpaid'}
        console.log(data)
        try{
            const response=await api.post('/api/addrent',data)
            const datares=response.data.message
            console.log(response.data.data)
            if(datares==='successfully'){
                seterrormessage('Successful Added')

            }
          
              
            

        }catch(error){
            console.error(error)
            if (error.response && error.response.status===422){
                seterrormessage('Already Allocated')

            }
          
        }
        
       
    }
    const handleback=()=>{
        backfunc(true,false)
       
    }
    return(
        <div className="w-64 md:w-96">
            <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-550 px-3  ">
            <div className="justify-center flex">
                <div className="bg-green-900 w-32 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Add Property
                </div>

                </div>
                <div className="text-right">#Tenant ID {tenantid}</div>
                <div className="h-450 overflow-y-scroll">
               
                <div className="flex justify-center">
                    <div>
                        <div className="mb-4 text-center text-sm text-red-500">{errormessage}</div>
                   
                    <div className="mt-2">
                       Property Address
                    </div>
                    <textarea readOnly value={propertyaddress} onChange={(e)=>(setpropertyaddress(e.target.value))} className="w-52 md:w-72 h-12 outline-0 border px-2 rounded-lg"></textarea>
                    <div className="mt-2">
                       <div className="text-xs">Rent Fees</div> 
                    </div>
                    <input readOnly value={rentfees} onChange={(e)=>setrentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       <div className="text-xs">Agent Fees</div> 
                    </div>
                    <input readOnly value={agentfees} onChange={(e)=>setagentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>

                    <div className="mt-2">
                       <div className="text-xs">Agreement Fees</div> 
                    </div>
                    <input readOnly value={agreementfees} onChange={(e)=>setagreementfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="flex justify-between mt-3">
                        <button onClick={handleback} className="px-2 bg-green-900 text-white"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</button>
                        <button onClick={handlesubmit} className="px-2 bg-green-900 text-white"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Submit</button>
                    </div>


                    </div>
                    
                   

                </div>

                </div>
                
             
           

            </div>

        </div>

    )
}
export default Addtenantform