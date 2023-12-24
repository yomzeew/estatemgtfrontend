import { useState } from "react"

const Addpropertyform=({showaddprops,showaddimage,getname,getid})=>{
    const [name,setname]=useState('')
    const [propertyaddress,setpropertyaddress]=useState('');
    const [typeofproperty,settypeofproperty]=useState('');
    const [description,setdescription]=useState('')
    const [rentfees,setrentfees]=useState('');
    const [agentfees,setagentfees]=useState('');
    const [agreementfees,setagreementfees]=useState('');
    const [errormessage,seterrormessage]=useState('')
    
    const handlenext=()=>{
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
        const data={client_id:getid,client_name:getname,property_address:propertyaddress,category:typeofproperty,description:description,rent_fees:rentfees,agent_fees:agentfees,agreement:agreementfees,available_status:'Available'}
        localStorage.setItem('data',JSON.stringify(data))
        showaddimage(false,false,true)
    }
    const handleback=()=>{
        showaddprops(false,true,false)
    }
    return(
        <div className="w-64 md:w-96">
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
                        Client Name
                    </div>
                    <input value={getname} readOnly className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       Property Address
                    </div>
                    <textarea onChange={(e)=>(setpropertyaddress(e.target.value))} className="w-52 md:w-72 h-12 outline-0 border px-2 rounded-lg"></textarea>

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
                    <input  onChange={(e)=>setrentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="mt-2">
                       <div className="text-xs">Agent Fees</div> 
                    </div>
                    <input onChange={(e)=>setagentfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>

                    <div className="mt-2">
                       <div className="text-xs">Agreement Fees</div> 
                    </div>
                    <input onChange={(e)=>setagreementfees(e.target.value)} className="w-52 md:w-72 h-8 outline-0 border px-2 rounded-lg"/>
                    <div className="flex justify-between mt-3">
                        <button onClick={handleback} className="px-2 bg-green-900 text-white"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</button>
                        <button onClick={handlenext} className="px-2 bg-green-900 text-white"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Next</button>
                    </div>


                    </div>
                    
                   

                </div>

                </div>
                
             
           

            </div>

        </div>

    )
}
export default Addpropertyform