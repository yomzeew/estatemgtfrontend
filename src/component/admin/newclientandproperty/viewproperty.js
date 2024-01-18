import { useEffect, useState } from "react"
import api from "../../api/api"
import Addimageproperty from "./addimageproperty"
import AddExpenses from "./addexpenses"

const ViewProperty=({getid,block_id})=>{
    const [data,setdata]=useState([])
    const [errormsg,seterrormsg]=useState('')
    const [showimage,setshowimage]=useState(false)
    const [id,setid]=useState('')
    const [viewexp,setviewexp]=useState(false)
    const [expensesdata,setexpensesdata]=useState([])
    const [expensesall,setexpensesall]=useState([])
    const fetchdata=async()=>{
        console.log(block_id)
        try{
            const response=await api.get(`/api/selectallgroup/${block_id}/${getid}`)
            const datares=response.data.data
            if(datares.length>0){
                setdata(datares)

            }
            else{
                seterrormsg('No Record Found')
            }

        }
        catch(error){

        }
        
    }
    useState(()=>{
        fetchdata()

    },[])
    const handleaddimage=(value)=>{
        setid(value)
        setshowimage(true)

    }
    const handleviewexp=(value)=>{
        setid(value)
        setviewexp(true)

    }
    const handleupdateimage=(value)=>{

    }
    const handleshowexp=async(value)=>{
        setid(value)
       
       

    }
    
    const fetchallexpenses=async()=>{
        try{
            const response=await api.get('/api/selectexpall')
            const datares=response.data.data
            if(datares.length>0){
                setexpensesall(datares)
            }
        }catch(error){

        }
    }
    useEffect(()=>{
        fetchallexpenses()

    },[])
    return(
        <div className="md:w-750 w-64 bg-white px-5 py-5 h-567 overflow-y-scroll">
            {showimage &&
            <div className="absolute z-50 w-full flex justify-center">
            <div className="flex justify-center bg-white">
                <div>
                    <div className="flex justify-end"><button onClick={()=>{setshowimage(false)}} className="text-red-500"><i class="fa fa-times" aria-hidden="true"></i>Close</button></div>
                <Addimageproperty
                getid={id}
                />
                    </div>
               
                </div>
                </div>
              
            }
            {
                viewexp &&
                <div className="absolute z-50 w-full flex justify-center">
                <div className="flex justify-center bg-white">
                <div>
                    <div className="flex justify-end"><button onClick={()=>{setviewexp(false)}} className="text-red-500"><i class="fa fa-times" aria-hidden="true"></i>Close</button></div>
                <AddExpenses
                clientid={getid}
                propertyid={id}
                blockid={block_id}
                />
                    </div>
               
                </div>
                </div>
            }
            {!showimage &&
            data.length>0 &&data.map((item,index)=>{
                //get the expenses 
                let totalexpenses=0

                const gettheexpensesarraybyid=expensesall.filter((exp)=>(
                  exp.property_id===item.id
                ))
                gettheexpensesarraybyid.length>0&&gettheexpensesarraybyid.map((expenses,index)=>{
                    const getexp=JSON.parse(expenses.expenses)
                    totalexpenses= totalexpenses+getexp


                    })


                return(
            <div className={viewexp?`border-b border-slate-300 pb-5 blur-lg`:`border-b border-slate-300 pb-5`}>
                <div className="flex justify-between">
                <div>Property ID:{item.id}</div>
                <div>Block ID:{item.properties_group}</div>
                </div>
                
                <div>Address:{item.property_address}</div>
                <div>Description:{item.description}</div>
                <div className="font-bold">Rent Fees:N{item.rent_fees}</div>
                <div className="font-bold">Agent Fees:N{item.agent_fees}</div>
                <div className="font-bold">Agreement:N{item.agreement}</div>
                <div className="text-red-500 font-bold">Total Expenses:N{totalexpenses}</div>
                <button onClick={()=>handleupdateimage(item.id)}  className="bg-yellow-500 text-white py-3 px-3">Update Details</button>
                <div>Allocated to Tenant:<span>Seun Olu</span></div>
               
                <div className="flex justify-between mt-5">
                    <div>
                    <div>Available Status</div>
                    <div className="bg-green-900 py-3 px-2 rounded-xl text-center text-white">Available</div>
                    </div>
                    <div>
                    <div>Expenses</div>
                    <button onClick={()=>handleviewexp(item.id)} className="bg-red-500 py-3 px-2 rounded-xl text-center text-white">Add Expenses</button>
                    </div>

                    </div>
                   {id===item.id &&<table className="w-full">
                        <thead>
                            <tr>
                                <th>
                                    S/N
                                </th>
                                <th>
                                    Expenses                               
                                     </th>
                                <th>
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gettheexpensesarraybyid.length>0&&gettheexpensesarraybyid.map((item,index)=>(<tr>
                                <td className="text-center">
                                    {index+1}

                                </td>
                                <td className="text-center">
                                    {item.expenses}

                                </td>
                                <td className="text-center">
                                    {item.description}

                                </td>
                            </tr>))}
                            {expensesdata.length<1 &&
                            <tr>
                                <td colSpan={3} className="text-center">
                                    No Record Found

                                </td>
                                </tr>
                            }
                        </tbody>
                    </table>}
                    <div>
                    <button onClick={()=>handleaddimage(item.id)} className="bg-yellow-500 text-green-900 w-1/2 py-2 rounded-xl mt-5">Add image</button>
                    <button onClick={()=>handleshowexp(item.id)} className="bg-green-900 text-yellow-500 w-1/2 py-2 rounded-xl mt-5">View Expenses</button>
                    </div>
                    
                    
               

                </div>)})}
                

            </div>
       

    )
}
export default ViewProperty