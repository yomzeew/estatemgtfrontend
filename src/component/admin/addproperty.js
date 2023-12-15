import { useEffect, useState } from "react"
import api from "../api/api"
const Addproperty=({showform,clientname,id})=>{
    const [name,setname]=useState('Oluwasuyi Babayomi')
    const [clientid,setclientid]=useState(1)
    const [data,setdata]=useState([])
    const handlenext=(clientid,firstname,lastname)=>{
        showform(true,false,false)
        clientname(firstname+' '+lastname);
        id(clientid)
    }
    const fetchdata=async()=>{
        try{
            const response=await api.get('/api/selectallclient')
            const datares=response.data.data
            setdata(datares)

        }catch(error){
            console.error(error)
        }

    }
    useEffect(()=>{
        fetchdata()
    },[])
    return(
        <div className="w-64 md:w-96">
            <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-500 px-3 ">
                <div className="justify-center flex">
                <div className="bg-green-900 w-32 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Add Property
                </div>
             
                </div>
                <div className="text-xs text-center">
                   Search Client by Name or Client id
                </div>
                <div className='flex justify-center'>
                    <div>
                    <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                   <input className="md:w-72 w-52 h-8 outline-0 border rounded-2xl px-7"/>

                    </div>
                
            </div>
            <div className="h-400 overflow-y-scroll">
           {data.length>0 &&data.map((items,index)=>(<div className="bg-slate-300 mt-3">
                <div className="flex justify-between px-5 py-2">
                <div className="text-xs">{(items.firstname).toUpperCase()}{(items.lastname).toUpperCase()}</div>
                <button onClick={()=>handlenext(items.id,items.firstname,items.lastname)} className="bg-green-900 text-yellow-500 w-32 rounded-2xl text-sm"><i class="fa fa-plus" aria-hidden="true"></i>Add Property</button>

                </div>
                
            </div>
            )) }
            </div>
            

            </div>

        </div>

    )
}
export default Addproperty