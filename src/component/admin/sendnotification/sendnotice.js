import { useEffect, useState } from "react"
import api from "../../api/api";

const SendNotice=()=>{
    const [data,setdata]=useState([]);
    const [id,setid]=useState('');
    const [showsend,setshowsend]=useState(false)
    const [errormessage,seterrormessage]=useState('')
    const [Base64String,setBase64String]=useState('')
    const [description,setdescription]=useState('')
   
    const fetchdata=async()=>{
    try{
            const response=await api.get('/api/selectall')
            const datares=response.data.data
            console.log(datares)
            setdata(datares)

        }catch(error){
            console.error(error)

        }
        
    }
    useEffect(()=>{
        fetchdata()
    },[])

    const handlefile=(e)=>{
        const selectedFile=e.target.files[0]
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
               
              const base64Result = e.target.result;
              

              setBase64String(base64Result);
            };
            reader.readAsDataURL(selectedFile);
          } else {
            seterrormessage('Select Notice file')
           return
          }

    }


    const handlesend=(value)=>{
        setshowsend(true)
        setid(value)
    }
    const sendNoticefile=async()=>{
        const data={tenant_id:id,notice_file:Base64String,description:description}
        try{
        const response=await api.post('/api/sendnotice',data)
        const datares=response.data.message
        if(datares==='added'){
            seterrormessage('Notice Send')
        }
        }catch(error){
            console.error(error)

        }

    }
    return(
        <div className="md:w-750 w-64 bg-slate-200 flex justify-center">
            {showsend&&<div className="absolute h-52 w-52 bg-slate-100 z-50 px-5 py-3 text-sm rounded-xl">
            <div className="flex justify-end">
            <button  onClick={()=>setshowsend(false)} className=" bg-red-500 text-white px-3 rounded-xl"><i class="fa fa-times" aria-hidden="true"></i>Close</button>
            </div>
                <div className="py-5">
                    <div className="text-center text-green-900">{errormessage}</div>
                
                    <div>Tenant ID {id}</div>
                    <div>Description</div>
                    <input onChange={(e)=>setdescription(e.target.value)} />
                    <input 
                     onChange={(e)=>handlefile(e)}
                     type="file" />
                    <div><button onClick={sendNoticefile} className="bg-green-900 mt-5 text-white py-2 px-3 rounded-2xl">Send </button></div>
                </div>

            </div>}
        
       
        <div>
            <div className="flex justify-center">
            <div className="bg-green-900 w-52 rounded-b-xl text-yellow-500 h-8 flex justify-center">
            <i class="fa fa-plus" aria-hidden="true"></i>Display Property Record
        </div>
        

            </div>
            
        
        <div className=" relative overflow-scroll h-567 md:w-750 w-64">
            <table className="border-0 w-full mt-5">
                <thead>

              
                <tr  className=" bg-green-400 md:text-sm text-xs">
                <td className="text-center">
                    S/N
                </td>
                <td className="text-center">
                    Tenant ID
                </td>
                <td className="text-center">
                   First Nsme
                </td>
                <td className="text-center">
                   Last Name
                </td>
                <td className="text-center">
                    Email
                </td>
                <td className="text-center">
                    Mobile No
                </td>
                <td className="bg-red-500 px-5 text-center text-white">
                   Send Notice
                </td>
                    
                </tr>
                </thead>
                <tbody>
                {data.length > 0 &&
  data.map((items, index) => {
    

    return ( 
                <tr>
                     <td className="text-center">
                   {index+1}
                </td>
                <td className="text-center">
                {items.id}
                </td>
                <td className="text-center">
                {items.firstname}
                </td>
                <td className="text-center">
                 {items.lastname}
                </td>
                <td className="text-center">
                    {items.email}
                </td>
                <td className="text-center">
                   {items.mobileno}
                </td>
                <td className="text-red-500 px-5 text-center">
                <button onClick={()=>handlesend(items.id)} className="text-xs"><i class="fa fa-paper-plane" aria-hidden="true"></i>Send Notice</button>
                </td>
                </tr>
                );
            })
          }
              { data.length<0 && <tr>
                    <td colSpan={10}>No Record</td>
                    </tr>}

                </tbody>
         
            </table>
  

        </div>
        

        </div>
        

    </div>
    )
}
export default SendNotice