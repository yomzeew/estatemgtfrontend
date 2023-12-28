import { useEffect, useState } from "react"
import api from "../../api/api";
import Loader from "../../loader";

const TenantRecord=()=>{
    const [data,setdata]=useState([]);
    const [id,setid]=useState('');
    const [showupdate,setshowupdate]=useState(false)
    const [errormessage,seterrormessage]=useState('')
    const [confirmdelete,setconfirmdelete]=useState(false)
    const [showloader,setshowloader]=useState(false)
    const fetchdata=async()=>{
        setshowloader(true)
        try{
            const response=await api.get('/api/selectall')
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

    const handeclose=(value)=>{
        setshowupdate(value)
    }
    const handledelete=(value)=>{
        setid(value)
        setconfirmdelete(true)


    }
    const finaldelete=async()=>{
       
        try{
            const response=await api.delete(`/api/delectuser/${id}`)
            const datares=response.data.message
            console.log(datares)
            if(datares==='User deleted successfully'){
                seterrormessage('User deleted successfully')
                setconfirmdelete(false)
                fetchdata()
            


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
                <td className="text-center">
                    Alt Mobile No
                </td>
                <td className="text-center">
                    Address
                </td>
                <td className="text-center">
                    State
                </td>
                <td className="text-center">
                   LGA
                </td>
                <td className="text-center">
                   Occupation
                </td>
                <td className="text-center">
                  Status
                </td>
                <td className="text-center">
                 Next of Kin
                </td>
                <td className="bg-red-500 px-5 text-center text-white">
                    Delete Record
                </td>
                    
                </tr>
                </thead>
                <tbody>
                {data.length > 0 &&
  data.map((items, index) => {
    let Nextofkindata = items.nextofkindetails;
    let Nextofkinname = '';
    let Nextofkinno = '';
    let Nextofkinaddress = '';

    try {
      Nextofkindata = JSON.parse(Nextofkindata);

      // Make sure Nextofkindata is an array
      if (Array.isArray(Nextofkindata) && Nextofkindata.length > 0) {
        Nextofkinname = Nextofkindata[0].Nextofkinname || '';
        Nextofkinno = Nextofkindata[0].Nextofkinno || '';
        Nextofkinaddress = Nextofkindata[0].Nextofkinaddress || '';
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error, e.g., set default values or skip the row
    }

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
                <td className="text-center">
                   {items.altmobileno}
                </td>
                <td className="text-center">
                   {items.address}
                </td>
                <td className="text-center">
                   {items.lga}
                </td>
                <td className="text-center">
                   {items.state}
                </td>
                <td className="text-center">
                   {items.occupation}
                </td>
                <td className="text-center">
                   {items.status}
                </td>
                <td className="text-center">
            {Nextofkinname}|{Nextofkinno} |{Nextofkinaddress}
                  
                </td>
                <td className="text-red-500 px-5 text-center">
                <button onClick={()=>handledelete(items.id)} className="text-xs"><i class="fa fa-trash" aria-hidden="true"></i>Delete Record</button>
                </td>
                </tr>
                );
            })
          }
              { data.length<0 && <tr>
                    <td colSpan={10}>No Record</td>
                    </tr>}
                    {showloader && <tr><td colSpan={10} align="center"><Loader/></td></tr>}

                </tbody>
         
            </table>
  

        </div>
        

        </div>
        

    </div>
    )
}
export default TenantRecord