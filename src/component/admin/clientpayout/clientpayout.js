import { useEffect, useState } from "react"
import api from "../../api/api";

const ClientPayout=({id,showlist,name})=>{
    const [client_id,setclient_id]=useState('')
    const [property_id,setproperty_id]=useState('')
    const [client_name,setclien_name]=useState('');
    const [rentfees,setrentfees]=useState('');
    const [payment_date,setpayment_date]=useState('');
    const [due_date,setdue_date]=useState('');
    const [expenses,setexpenses]=useState([]);
    const [amount_due,setamount_due]=useState('')
    const [payment_status,setpayment_status]=useState('')
    const [showExpense,setshowExpense]=useState(false)
    const [expensesAmount,setexpensesAmount]=useState('')
    const [expensesReason, setexpensesReason]=useState('')
    const [data,setdata]=useState([])

    const handlesubmit=()=>{
        const expensesdata={amount:expensesAmount,reason:expensesReason}
        const prevexpenses=[...expenses,expensesdata]
        console.log(prevexpenses)
        setexpenses(prevexpenses)

    }
    const handleshow=()=>{
        showlist(true,false)
        
    }
    const fetchdata=async()=>{
    
        const response=await api.get(`/api/selectpropertybyclientid/${id}`)
        const datares=response.data.data
        setdata(datares)


    }
    useEffect(()=>{
        fetchdata()

    },[])


    return(
        <div className="md:w-750 w-64 bg-slate-200 flex justify-center ">
           {showExpense &&<div className="absolute z-50 md:w-96 w-64 bg-white py-5 px-5">
                <button onClick={()=>setshowExpense(false)} className="text-red-500">Close <i class="fa fa-times" aria-hidden="true"></i></button>
            <div className="flex justify-center">
                <div>
                <div className="border-b-2 border-green-900 w-64 text-center">Enter Expenses</div>
                <div>Amount</div>
                <input onChange={(e)=>setexpensesAmount(e.target.value)} className="w-64 rounded-lg outline-0 border h-8 px-2" />
                <div>Reason</div>
                <input onChange={(e)=>setexpensesReason(e.target.value)} className="w-64 rounded-lg outline-0 border h-12 px-2" />
                <div className="mt-2">
                <button onClick={handlesubmit} className="bg-yellow-500 px-2 rounded-lg">Submit</button>
                </div>


                </div>
               
                </div>
                

            </div>}
            <div>

           
            <div>
                <button onClick={handleshow}><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
                </div>
            <div className="h-550 overflow-y-scroll">
            
         
            
            {data.length>0
            &&data.map((item,index)=>{
                return(
                <div className="md:w-550 w-64 h-auto rounded-xl bg-white py-5 px-5 mt-2">
                
               
                <div className="justify-between flex">
                    <div>Client ID:{id}</div>
                    <div>Property ID:{item.id}</div>
                    </div>
                <div className="font-bold">{name}</div>
                <div className="bg-green-100 py-1 px-2">Rent fees:N{item.rent_fees}</div>
                <div className="bg-green-200 py-1 px-2">Property Allocated to:Sen Jens(tenanat ID:00002)</div>
                <div className="bg-green-300 py-1 px-2">Amount By Tenant:N100,000</div>
                <div className="bg-green-400 py-1 px-2">Payment Date:2 January, 2024</div>
                <div className="bg-green-500 py-1 px-2">Next Payment Date:2 January, 2025</div>
                <div>List of Expenses</div>
                <table border={1} className="table w-full">
                    <tr className="bg-green-900 text-white">
                        <td>S/N</td>
                        <td>Amount</td>
                        <td>Reason</td>
                        <td align="center" className="bg-red-500">Delete</td>
                    </tr>
                    {expenses.length>0 && expenses.map((item,index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.amount}</td>
                        <td>{item.reason}</td>
                    </tr>))}

                    <tr>
                        <td colSpan={2}><span className="text-red-500">Total Expenses:</span>N10000</td>
                    </tr>
                </table>
                <div className="flex justify-between">
                    <div>
                    <button onClick={()=>(setshowExpense(true))} className="bg-green-900 text-white rounded-xl px-5">Enter Expenses</button>

                    </div>
                    <div>
                    <button className="bg-green-900 text-white rounded-xl px-5">Enter Amount Due</button>

                    </div>

                </div>
                <div>
                    <span className="text-green-900">Amount Due for Collection:</span>N200,000
                </div>
                <div>
                    <button className="bg-yellow-500 rounded-xl w-full py-2">Submit </button>
                </div>
                <div className="text-green-900 text-xl">
                    Payment Not Yet Paid
                </div>
                <div>
                    <button className="bg-yellow-500 rounded-xl w-full py-2">Payment Status</button>
                </div>
                
                
            </div>)})}

            </div>
            

            </div>

        </div>
    )
}
export default ClientPayout