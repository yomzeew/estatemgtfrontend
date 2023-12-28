import { useEffect, useState } from "react"
import api from "../api/api"

const DisplayInbox=({shownotice,tenantId})=>{
    const [data, setdata]=useState([]);
    const fetchdata=async()=>{
        const response=await api.get(`/api/getnotifications/${tenantId}`)
        const datares=response.data.data
        setdata(datares);

    }
    useEffect(()=>{
        fetchdata();

    },[])
   
    const handleshownotice=()=>{
        shownotice(true)
    }
    const handledelete=async()=>{
        const response=await api.delete(`/api/deletenotice/${tenantId}`)
        fetchdata();


    }
    function formatDateTimeToYMD(dateTimeString) {
        const dateTime = new Date(dateTimeString);
      
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }
    return(
        <div className="w-72 md:w-96 h-auto px-2 bg-white pt-5">
           {data.length>0 && data.map((item,index)=>(  <div className="w-full h-12 bg-slate-300 rounded-2xl flex items-center mt-3">
                <div className="bg-yellow-500 px-3 p-3 rounded-xl"><i class="fa fa-bell" aria-hidden="true"></i></div>
                <div 
                onClick={item.typeofmessage==='notice'?handleshownotice:''}
                 className="flex-1 text-center">{item.message}{item.typeofmessage==='notice'?'!':''}&nbsp;{formatDateTimeToYMD(item.created_at)}
                 </div>
            </div> ))}
            <button onClick={handledelete} className="bg-yellow-500 text-green-900 rounded-xl px-5 mt-5 py-2">Clear All</button>
      


        </div>
    )
}
export default DisplayInbox