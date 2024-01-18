import { useState } from "react"
import api from "../../api/api";

const Propertyform=({getaddress,getid,block_id})=>{
    const [name,setname]=useState('')
    const [propertyaddress,setpropertyaddress]=useState('');
    const [typeofproperty,settypeofproperty]=useState('');
    const [description,setdescription]=useState('')
    const [rentfees,setrentfees]=useState('');
    const [agentfees,setagentfees]=useState('');
    const [agreementfees,setagreementfees]=useState('');
    const [errormessage,seterrormessage]=useState('')
    
    const handlenext=async()=>{
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
        const data={client_id:getid,properties_group:block_id,property_address:propertyaddress,category:typeofproperty,description:description,rent_fees:rentfees,agent_fees:agentfees,agreement:agreementfees,available_status:'Available'}
        try{
           
            const response=await api.post('/api/addproperty',data)
            const datares=response.data.message
            if(datares==='successfully'){
              seterrormessage('Property Added')
            }
            else{
              seterrormessage('Property Not Added')
            }


          }catch(error){
            console.error(error)
          }
       
    }
    return(
        <div >
            <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-550 px-3  ">
            <div className="justify-center flex">
                <div className="bg-green-900 w-32 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Add Property
                </div>

                </div>
                <div className="text-right">#Client ID {getid}</div>
                <div className="h-450 overflow-y-scroll">
               
                <div className="flex justify-center">
                    <div>
                        <div className="mb-4 text-center text-sm text-red-500">{errormessage}</div>
                    
                    <div className="mt-2">
                       Property Address
                    </div>
                    <textarea  onChange={(e)=>(setpropertyaddress(e.target.value))} className="w-52 md:w-72 h-12 outline-0 border px-2 rounded-lg">{getaddress}</textarea>

                    <div className="mt-2">
                        Type of Property
                    </div>
                    <select onChange={(e)=>(settypeofproperty(e.target.value))} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg">
                         <option value=" "> Type of Property</option>
                        <option value="Residential">Residential</option>
                        <option  value="Commercial">Commecial</option>
                    </select>
                    <div className="mt-2">
                      Property Description 
                    </div>
                    <div className="text-xs">hint: 2 bedroom flat duplex or 3 office apartment</div>
                    <input  onChange={(e)=>setdescription(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       <div className="text-xs">Rent Fees</div> 
                    </div>
                    <input type="number"  onChange={(e)=>setrentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       <div className="text-xs">Agent Fees</div> 
                    </div>
                    <input type="number" onChange={(e)=>setagentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>

                    <div className="mt-2">
                       <div className="text-xs">Agreement Fees</div> 
                    </div>
                    <input type="number" onChange={(e)=>setagreementfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="flex justify-between mt-3">
                       
                        <button onClick={handlenext} className="px-2 bg-green-900 text-white"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i>Submit</button>
                    </div>


                    </div>
                    
                   

                </div>

                </div>
                
             
           

            </div>

        </div>

    )
}
export default Propertyform