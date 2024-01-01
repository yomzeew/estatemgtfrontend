import { useEffect, useState } from "react"
import api from "../../api/api"
import ClientPayout from "./clientpayout"

const ListClient=()=>{
    const [data, setdata]=useState([])
    const [showloader,setshowloader]=useState(false)
    const [showlist,setshowlist]=useState(true)
    const [showclientpayout,setshowclientpayout]=useState(false)
    const [id,setid]=useState('')
    const [name,setname]=useState('')
    const fetchdata=async()=>{
        setshowloader(true)
        

        try{
            const response=await api.get('/api/selectallclient')
            const datares=response.data.data
            console.log(datares)
            setdata(datares)

        }catch(error){
            console.error(error)

        }
        finally{
            setshowloader(false)
        }
        
    }
    useEffect(()=>{
        fetchdata()
    },[])
    const handlepayout=(value,firstname,lastname)=>{
        setid(value)
        setshowclientpayout(true)
        setshowlist(false)
        setname(firstname+' '+lastname)

    }
    const showlistfunc=(value,valuetwo)=>{
        setshowlist(value)
        setshowclientpayout(valuetwo)
        

    }
    return(
       <div>
        {showlist &&<div className="md:w-750 w-64 flex justify-center">
            <div>
            <div className='mb-3'>
                <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                <input placeholder='search by name, tenant id and payment status ' className="md:w-96 w-56 h-8 outline-0 border rounded-2xl px-7"/>
                <button className='bg-yellow-500 px-3 rounded-2xl'>Search</button>
            </div>
            <div className="h-500 overflow-y-scroll">
               {data.length>0&&data.map((item,index)=>
               ( <div className="flex justify-center gap-5">
                    <div>Client ID:{item.id}</div>
                    <div>{item.firstname} {item.lastname}</div>
                    <button onClick={()=>handlepayout(item.id,item.firstname,item.lastname)} className="bg-green-900 px-2 py-1 text-yellow-500">Check Payout</button>

                </div>))}

            </div>

            </div>
        

        </div>}
        {showclientpayout &&
        <ClientPayout
        id={id}
        showlist={(value,valuetwo)=>showlistfunc(value,valuetwo)}
        name={name}

        />}

       </div> 
        
    )
}
export default ListClient