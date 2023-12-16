import { useEffect, useState } from "react"
import api from "../../api/api";
import Updatepropertyform from "./updateformproperty";

const DisplayPropertyRec=()=>{
    const [data,setdata]=useState([]);
    const [id,setid]=useState('');
    const [showupdate,setshowupdate]=useState(false)
    const [errormessage,seterrormessage]=useState('')
    const [confirmdelete,setconfirmdelete]=useState(false)
    const fetchdata=async()=>{
        try{
            const response=await api.get('/api/selectproperty')
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
    const handleupdate=(value)=>{
        setid(value)
        setshowupdate(!showupdate)


    }
    const handeclose=(value)=>{
        setshowupdate(value)
    }
    const handledelete=(value)=>{
        setid(value)
        setconfirmdelete(true)


    }
    const finaldelete=async()=>{
       
        try{
            const response=await api.delete(`/api/deleteproperty/${id}`)
            const datares=response.data.message
            console.log(datares)
            if(datares==='User deleted successfully'){
                seterrormessage('User deleted successfully')
            }
         

        }catch(error){
            console.error(error)

        }
    }
    return(
        <div className="md:w-750 w-64 bg-slate-200 flex justify-center">
            {confirmdelete && <div className="absolute top-40 z-50 flex justify-center items-center">
           
                <div className="w-52 rounded-xl bg-slate-100 h-44 flex justify-evenly items-center">
                   
                        <div>
                        <div className="text-center text-xs"> Do you want to delete Record {id}</div>
                        <div className="flex justify-evenly mt-5">
                        <button className="text-white bg-red-500 px-3 rounded-xl" onClick={finaldelete}>Yes</button>
                    <button  className="text-white bg-green-900 px-3 rounded-xl" onClick={()=>{setconfirmdelete(false)}}>No</button >
                            </div>
                  
                        </div>
                           
                       
                    
                </div>

               
            </div>}
            {showupdate &&<div className="absolute z-50 top-40  h-400 md:w-96 w-64  flex justify-center items-center">
                
               <Updatepropertyform
                getid={id}
                close={(value)=>handeclose(value)}
                />
            </div>}
            <div>
                <div className="flex justify-center">
                <div className="bg-green-900 w-52 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                <i class="fa fa-plus" aria-hidden="true"></i>Display Property Record
            </div>
            

                </div>
                <div className="text-center">{errormessage}</div>
            
            <div className=" relative overflow-scroll h-567 md:w-750 w-64">
                <table className="border-0 w-full mt-5">
                    <thead>

                  
                    <tr  className=" bg-green-400 md:text-sm text-xs">
                    <td className="text-center">
                        S/N
                    </td>
                    <td className="text-center">
                        Client ID
                    </td>
                    <td className="text-center">
                        Client Name
                    </td>
                    <td className="text-center">
                       Property Type
                    </td>
                    <td className="text-center">
                        Description
                    </td>
                    <td className="text-center">
                        Rent Fees
                    </td>
                    <td className="text-center">
                        Agent Fees
                    </td>
                    <td className="text-center">
                        Agreement Fees
                    </td>
                    <td className="bg-green-900 px-5 text-center text-white">
                       Update Record
                    </td>
                    <td className="bg-red-500 px-5 text-center text-white">
                        Delete Record
                    </td>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {data.length>0?
                    data.map((items,index)=>(
                    <tr>
                         <td className="text-center">
                       {index+1}
                    </td>
                    <td className="text-center">
                    {items.client_id}
                    </td>
                    <td className="text-center">
                    {items.client_name}
                    </td>
                    <td className="text-center">
                     {items.category}
                    </td>
                    <td className="text-center">
                        {items.description}
                    </td>
                    <td className="text-center">
                       N{items.rent_fees}
                    </td>
                    <td className="text-center">
                       N{items.agent_fees}
                    </td>
                    <td className="text-center">
                       N{items.agreement}
                    </td>
                    <td className="text-center text-green-500">
                       <button onClick={()=>handleupdate(items.id)}   className="text-xs"><i class="fa fa-refresh" aria-hidden="true"></i>Update</button>
                    </td>
                    <td className="text-red-500 px-5 text-center">
                    <button onClick={()=>handledelete(items.id)} className="text-xs"><i class="fa fa-trash" aria-hidden="true"></i>Delete Record</button>
                    </td>
                    </tr>
                    )):
                    <tr>
                        <td colSpan={10}>No Record</td>
                        </tr>}

                    </tbody>
             
                </table>
      

            </div>
            

            </div>
            

        </div>
    )
}
export default DisplayPropertyRec