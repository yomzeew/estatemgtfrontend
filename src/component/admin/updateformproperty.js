import { useEffect, useState } from "react"
import api from "../api/api";
import Updateimage from "./updateimages";

const Updatepropertyform=({getid,close})=>{
    const [propertyaddress,setpropertyaddress]=useState('');
    const [typeofproperty,settypeofproperty]=useState('');
    const [description,setdescription]=useState('')
    const [rentfees,setrentfees]=useState('');
    const [agentfees,setagentfees]=useState('');
    const [agreementfees,setagreementfees]=useState('');
    const [errormessage,seterrormessage]=useState('')
    const [uploadimage,setuploadimage]=useState(false)

    const fetchnyid=async()=>{
        try{
            const response=await api.get(`/api/selectpropertybyid/${getid}`)
            const datares=response.data.data
            setpropertyaddress(datares.property_address)
            settypeofproperty(datares.category)
            setdescription(datares.description)
            setagreementfees(datares.agreement)
            setagentfees(datares.agent_fees)
            setrentfees(datares.rent_fees)
            console.log(datares)
            

        }catch(error){
            console.error(error)

        }

    }
    useEffect(()=>{
        fetchnyid()

    },[])
    
    const handlesubmit=async()=>{
        if(!propertyaddress){
            seterrormessage('Please Enter Address')
            return
        }
        if(!typeofproperty){
            seterrormessage('Please Select Type of Property')
            return
        }
        if(!description){
            seterrormessage('Please Enter Description ')
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
        const data={property_address:propertyaddress,category:typeofproperty,description:description,rent_fees:rentfees,agent_fees:agentfees,agreement:agreementfees}
        try{
            const response=await api.put(`/api/updateproperty/${getid}`,data)
            const datares=response.data.message
            if(datares==='Property updated successfully'){
              seterrormessage('Property updated successfully')
              setTimeout(() => {
                close(false)
              }, 3000);
            

            }
            else{
              seterrormessage('Property Not Updated')
            }


          }catch(error){
            console.error(error)
          }
        
    }
    const handleclose=()=>{
        close(false)
    }
    const handleshowuploadimage=()=>{
        setuploadimage(true)

    }
    return(
        <div className="w-64 md:w-96">
            <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-550 px-3  ">
                <div className="text-right">
                    <button onClick={handleclose} className="text-red-500"><i class="fa fa-times" aria-hidden="true"></i>Close</button>
                    </div>
                   
                <div className="text-center">#Property ID {getid}</div>
                <div className="h-450 overflow-y-scroll">
               
                {!uploadimage &&<div className="flex justify-center">
                    <div>
                        <div className="mb-4 text-center text-sm text-red-500">{errormessage}</div>
                    <div className="mt-2">
                       Property Address
                    </div>
                    <textarea value={propertyaddress} onChange={(e)=>(setpropertyaddress(e.target.value))} className="w-52 md:w-72 h-12 outline-0 border px-2 rounded-lg"></textarea>

                    <div className="mt-2">
                        Type of Property
                    </div>
                    <select value={typeofproperty} onChange={(e)=>(settypeofproperty(e.target.value))} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg">
                         <option value=" "> Type of Property</option>
                        <option value="Residential">Residential</option>
                        <option  value="Commercial">Commecial</option>
                    </select>
                    <div className="mt-2">
                      Property Description 
                    </div>
                    <div className="text-xs">hint: 2 bedroom flat duplex or 3 office apartment</div>
                    <input value={description}  onChange={(e)=>setdescription(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       <div className="text-xs">Rent Fees</div> 
                    </div>
                    <input value={rentfees} onChange={(e)=>setrentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       <div className="text-xs">Agent Fees</div> 
                    </div>
                    <input value={agentfees} onChange={(e)=>setagentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>

                    <div className="mt-2">
                       <div className="text-xs">Agreement Fees</div> 
                    </div>
                    <input value={agreementfees} onChange={(e)=>setagreementfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="flex justify-center mt-3">
                        <button onClick={handlesubmit} className="px-2 bg-green-900 text-white"><i class="fa fa-refresh" aria-hidden="true"></i>Update Record</button>
                       
                    </div>
                    
                    <div className="flex justify-center mt-3">
                        <button onClick={handleshowuploadimage} className="px-2 bg-yellow-500 text-white"><i class="fa fa-refresh" aria-hidden="true"></i>Change Images</button>
                       
                    </div>


                    </div>
                    
                   

                </div>}
                {uploadimage &&
                <Updateimage
                getid={getid}
                
                />
                    
                }

                </div>
                
             
           

            </div>

        </div>

    )
}
export default Updatepropertyform