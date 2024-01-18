import { useState } from "react"
import api from "../../api/api"

const AddExpenses=({clientid,propertyid,blockid})=>{
    const [expamount,setexpamount]=useState('')
    const [description,setdescription]=useState('')
    const [errormsg,seterrormsg]=useState('')
    const [successmsg,setsuccessmsg]=useState('')
    const handlesubmit=async()=>{
        if(!expamount){
            seterrormsg('Enter Expenses')
            return
        }
        if(!description){
            seterrormsg('Enter Description')
            return
        }
        try{
            const data={client_id:clientid,property_id:propertyid,properties_group:blockid,expenses:expamount,description:description}
            const response=await api.post('/api/insertexp',data)
            const datares=response.data.message
            if(datares==='Successful'){
                setsuccessmsg('Added Successfully')
                setexpamount('')
                setdescription('')
            }

        }catch(error){
            console.error(error)
        }
        //client_id','property_id','properties_group','expenses','description

    }
    return(
        <div className="md:w-96 w-64 bg-white rounded-xl px-4">
            <div className="text-red-500 text-center">{errormsg}</div>
            <div className="text-green-500 text-center">{successmsg}</div>
            <div>Add Expenses Amount(N)</div>
            <input type="number" value={expamount} onChange={(e)=>setexpamount(e.target.value)} className="w-full rounded-xl h-8 px-2 outline-0 border" />
            <div className="mt-5">Description</div>
            <input value={description} onChange={(e)=>setdescription(e.target.value)} className="w-full rounded-xl px-2 h-8 outline-0 border" />
            <div className="mt-5">
                <button onClick={handlesubmit} className="px-5 py-2 bg-yellow-500  rounded-xl">Submit</button>
            </div>


        </div>
    )
}
export default AddExpenses