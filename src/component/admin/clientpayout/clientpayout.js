import { useEffect, useState } from "react"
import api from "../../api/api";

const ClientPayout=({id,showlist,name})=>{
    const [client_id,setclient_id]=useState('')
    const [property_id,setproperty_id]=useState('')
    const [client_name,setclien_name]=useState('');
    const [rentfees,setrentfees]=useState('');
    const [payment_date,setpayment_date]=useState('');
    const [due_date,setdue_date]=useState('');
    const [amount,setAmount]=useState('')
    const [amount_due,setamount_due]=useState('')
    const [payment_status,setpayment_status]=useState('')
    const [showExpense,setshowExpense]=useState(false)
    const [expensesAmount,setexpensesAmount]=useState('')
    const [expensesReason, setexpensesReason]=useState('')
    const [data,setdata]=useState([])
    const [dataone,setdataone]=useState([])
    const [datatwo,setdatatwo]=useState([])
    const [datathree,setdatathree]=useState([])
    const [datafour,setdatafour]=useState([])
    const [showAmount,setshowAmount]=useState(false)
    const [errormessage,seterrormessage]=useState('')
    const [idunique,setidunique]=useState('')
    const [showpaymentstatus,setshowpaymentstatus]=useState(false)
    const [paymentStatus, setPaymentStatus] = useState(null); // Initially set to null
    const [totalpayment,settotalpayment]=useState(0)
      
        const handleRadioChange = (e) => {
          setPaymentStatus(e.target.value === "Yes"); // Convert to boolean
        };
       
      
    
    const fetchdatapayout=async()=>{
        try{
            const response=await api.get('/api/selectallpayout');
            const datares=response.data.data
            setdatafour(datares)


        }catch(error){
            console.error(error)

        }

    }
    const handlesubmitpayout=async()=>{
        seterrormessage("");
        if (paymentStatus === null) {
            seterrormessage("Please select a payment status");
            return;
        }
        const datainsert={payment_status:paymentStatus}
        const insertResponse = await api.put(`/api/updatepayout/${idunique}`, datainsert);
        ////console.log(insertResponse);
        if(insertResponse.data.message==='Successful'){
            seterrormessage('Successfully Added')
            fetchdatapayout()
        }



    }
    const handledelete=async(value,idvalue,idunique)=>{
        // get the expenses only
        seterrormessage("");
        const expensesarray=JSON.parse(datafour[idvalue].expenses)
        expensesarray.splice(value, 1);
        const expensesStringfy=JSON.stringify(expensesarray)
        const datainsert={expenses:expensesStringfy}
        const insertResponse = await api.put(`/api/updatepayout/${idunique}`, datainsert);
        //console.log(insertResponse);
        if(insertResponse.data.message==='Successful'){
            seterrormessage('Successfully Added')
            fetchdatapayout()
        }

      
        

    }

    const handlesubmit = async() => {
        seterrormessage("");
        if (!expensesAmount) {
            seterrormessage('Enter Amount');
            return;
        }
        if (!expensesReason) {
            seterrormessage('Enter Reason');
            return;
        }
        let prevexpenses
       
        
      try{
        const response=await api.get(`/api/selectpayout/${idunique}`)
        const dataresmessage=response.data.message
        ////console.log(dataresmessage)

        if(dataresmessage==='Record Found'){
            const datares=response.data.data
            const getexpenses=JSON.parse(datares.expenses)

            const expensesdata ={ amount: expensesAmount, reason: expensesReason };
            if (Array.isArray(getexpenses)) {
               prevexpenses=[...getexpenses,expensesdata]
            }
            else{
                prevexpenses=[]
                prevexpenses=[...prevexpenses,expensesdata] 
            }
          
           
            const expensesStringfy=JSON.stringify(prevexpenses)
            const datainsert={client_id:id,property_id:idunique,rent_fees:rentfees,payment_date:payment_date,due_date:due_date,expenses:expensesStringfy,payment_status:false}
            const insertResponse = await api.put(`/api/updatepayout/${idunique}`, datainsert);
            ////console.log(insertResponse);
            if(insertResponse.data.message==='Successful'){
                seterrormessage('Successfully Added')
                fetchdatapayout()
            }




        }
        else{
            const expenses=[]
            const expensesdata ={ amount: expensesAmount, reason: expensesReason };
             prevexpenses=[...expenses,expensesdata]
            const expensesStringfy=JSON.stringify(prevexpenses)
            const datainsert={client_id:id,property_id:idunique,rent_fees:rentfees,payment_date:payment_date,due_date:due_date,expenses:expensesStringfy,payment_status:false}
            //console.log(datainsert)
            const insertResponse = await api.post('/api/insertpayout', datainsert);
            //console.log(insertResponse);
            if(insertResponse.data.message==='Successful'){
                seterrormessage('Successfully Added')
                fetchdatapayout()
            }

        }

      }
      catch(error){
        console.error(error)
      }
       



        setexpensesAmount('');
        setexpensesReason('');
    };
    const handlesubmitamount=async()=>{
        seterrormessage("");
        if(!amount){
            seterrormessage('Enter Amount')
            return
        }
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        const amountObject={amount:amount,datepayment:todayDate}
        let amountprev
        let amountArray
        try{
            const response=await api.get(`/api/selectpayout/${idunique}`)
            const dataresmessage=response.data.message
            //console.log(dataresmessage)
    
            if(dataresmessage==='Record Found'){
                const datares=response.data.data
                amountprev=datares.amount_due
                amountprev=JSON.parse(amountprev)
               
                //convert 
                if (Array.isArray(amountprev)) {
                    amountArray=[...amountprev,amountObject]  
                }
                else{
                  amountprev=[]
                  amountArray=[...amountprev,amountObject]   
                }
                const datainsert={amount_due:JSON.stringify(amountArray)}
                const insertResponse = await api.put(`/api/updatepayout/${idunique}`, datainsert);
                //console.log(insertResponse);
                if(insertResponse.data.message==='Successful'){
                    seterrormessage('Successfully Added')
                    fetchdatapayout()
                }
    
    
    
    
            }
            else{
                amountprev=[]
                amountArray=[...amountprev,amountObject]   
                const datainsert={client_id:id,property_id:idunique,rent_fees:rentfees,payment_date:payment_date,due_date:due_date,amount_due:JSON.stringify(amountArray),payment_status:false}
                //console.log(datainsert)
                const insertResponse = await api.post('/api/insertpayout', datainsert);
                //console.log(insertResponse);
                if(insertResponse.data.message==='Successful'){
                    seterrormessage('Successfully Added')
                    fetchdatapayout()
                }
    
            }
    
          }
          catch(error){
            console.error(error)
          }

    }
    const handleshow=()=>{
        showlist(true,false)
        
    }
    const fetchdataone=async()=>{
    
        const response=await api.get(`/api/selectallpayment`)
        const datares=response.data.data
        setdataone(datares)


    }
    const fetchdata=async()=>{
    
        const response=await api.get(`/api/selectpropertybyclientid/${id}`)
        const datares = response.data.data.map((item) => ({
            ...item,
            expenses: [], // Add expenses property to each item
        }));
        setdata(datares);

    }
    const fetchdatatwo=async()=>{
        try{
            const response=await api.get('/api/selectall')
            const datares=response.data.data
            //console.log(datares)
            setdatatwo(datares)

        }catch(error){
            console.error(error)

        }
     
    }
    const fetchdatathree=async()=>{
        try{
            const response=await api.get('/api/selectproperty')
            const datares=response.data.data
            ////console.log(datares)
            setdatathree(datares)

        }catch(error){
            console.error(error)

        }
    
        
    }
    
    useEffect(()=>{
        fetchdata()
        fetchdataone()
        fetchdatatwo()
        fetchdatathree()
        fetchdatapayout()
      

    },[])

    const handleid=(value,rent_fees,paymentdate,duedate)=>{
        setidunique(value)
        setrentfees(rent_fees)
        setpayment_date(paymentdate)
        setdue_date(duedate)
    }
    const getamounttotal=()=>{
        let totalpayment=0
        let dueamountArray
        const gettotalpaymentarray=datafour.filter((item)=>(
            item.client_id=id
        ))
        let paysdue=0
        if (gettotalpaymentarray.length>0){
            gettotalpaymentarray.map((itemget,index)=>{
                
                const getamountduearray=JSON.parse(itemget.amount_due)
                Array.isArray(getamountduearray) &&  getamountduearray.length>0 && getamountduearray.map((amountpay,index)=>{
                    const gettheamountarray=JSON.parse(amountpay.amount)
                    paysdue=paysdue+gettheamountarray

                })
            
            })

            

        }
        settotalpayment(paysdue)


    }
    useEffect(()=>{
        getamounttotal()
    },[])
   


    return(
        <div className="md:w-750 w-64 bg-slate-200 flex justify-center ">
             {showpaymentstatus &&<div className="absolute z-50 md:w-96 w-64 bg-white py-5 px-5">
                <button onClick={()=>setshowpaymentstatus(false)} className="text-red-500">Close <i class="fa fa-times" aria-hidden="true"></i></button>
            <div className="flex justify-center">
                <div>
                <div className="text-center text-red-500">{errormessage}</div>
                <div className="text-center">Payment Status</div>
                <div className="flex gap-5">
                   <div>Yes<input 
                   name="status" 
                   type="radio" 
                   value="Yes"
                    checked={paymentStatus === true}
                    onChange={handleRadioChange}
                    /></div>
                  <div> No<input
                   name="status"
                    type="radio" 
                    value="No"
                     checked={paymentStatus === false}
                     onChange={handleRadioChange}
                   /></div>
                </div>
                <div className="mt-2">
                <button onClick={handlesubmitpayout} className="bg-yellow-500 px-2 rounded-lg">Submit</button>
                </div>
               


                </div>
               
                </div>
                

            </div>}
           {showExpense &&<div className="absolute z-50 md:w-96 w-64 bg-white py-5 px-5">
                <button onClick={()=>setshowExpense(false)} className="text-red-500">Close <i class="fa fa-times" aria-hidden="true"></i></button>
            <div className="flex justify-center">
                <div>
                <div className="text-center text-red-500">{errormessage}</div>
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
            {showAmount &&<div className="absolute z-50 md:w-96 w-64 bg-white py-5 px-5">
                <button onClick={()=>setshowAmount(false)} className="text-red-500">Close <i class="fa fa-times" aria-hidden="true"></i></button>
            <div className="flex justify-center">
                <div>
                    <div className="text-center text-red-500">{errormessage}</div>
                <div className="border-b-2 border-green-900 w-64 text-center">Enter Amount</div>
                <div>Amount</div>
                <input onChange={(e)=>setAmount(e.target.value)} className="w-64 rounded-lg outline-0 border h-8 px-2" />
                <div className="mt-2">
                <button onClick={handlesubmitamount} className="bg-yellow-500 px-2 rounded-lg">Submit</button>
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
                //get property id for payment
                const getdatapaymentfromtenant=dataone.filter((items)=>(
                    items.property_id===item.id
                ))
             
                
                let payment
                let payment_date
                let tenant_id
                let due_date
                let expensestwo=[]
                let dueamount
                let amounttwo
                let amountnew=0
                let pays=0
                let pay_due
                let paystatus
                if(getdatapaymentfromtenant.length>0){
                    payment=getdatapaymentfromtenant[0].advance_payment
                    payment_date=getdatapaymentfromtenant[0].payment_date
                    tenant_id=getdatapaymentfromtenant[0].tenant_id
                    due_date=getdatapaymentfromtenant[0].due_date

                }
                ////console.log(payment)
                // get tenant name
                let tenantname
                
                    const getname=datatwo.filter((item)=>(
                        item.id===tenant_id
                    ))
               
            
                if (getname.length > 0) {
                    const firstname = getname[0].firstname;
                    const lastname = getname[0].lastname;
                    tenantname = firstname + ' ' + lastname;
                }
                const getexpenses=datafour.filter((items)=>(
                    items.property_id===item.id

                ))

                ////console.log(getexpenses)
                if(getexpenses.length>0){
                    expensestwo=JSON.parse(getexpenses[0].expenses)
                    dueamount=JSON.parse(getexpenses[0].amount_due)
                    paystatus=getexpenses[0].payment_status
                    console.log(paystatus)
                    
                    
                    Array.isArray(expensestwo) && expensestwo.length>0 && expensestwo.map((amounted,index)=>{
                        const amountexp=JSON.parse(amounted.amount)
                        amountnew=amountnew+amountexp
                    })
                    Array.isArray(dueamount) && dueamount.length>0 && dueamount.map((amountpay,index)=>{
                        const amountselect=JSON.parse(amountpay.amount)
                        pays=pays+amountselect
                        const getindex=dueamount.length
                        pay_due=dueamount[getindex-1].amount

                    })
                    // get the total payment 
                  



                    
                }

                
                return(
                <div className="md:w-550 w-64 h-auto rounded-xl bg-white py-5 px-5 mt-2">
                
               
                <div className="justify-between flex">
                    <div>Client ID:{id}</div>
                    <div>Property ID:{item.id}</div>
                    </div>
                <div className="font-bold">{name}</div>
                <div className="bg-green-100 py-1 px-2">Rent fees:N{item.rent_fees}</div>
                <div className="bg-green-200 py-1 px-2">Property Allocated to:{tenantname?tenantname+'('+tenant_id+')':'Not Allocated'}</div>
                <div className="bg-green-300 py-1 px-2">Amount By Tenant:{payment||'Not yet Paid'}</div>
                <div className="bg-green-400 py-1 px-2">Payment Date:{payment_date||'Not yet Paid'}</div>
                <div className="bg-green-500 py-1 px-2">Next Payment Date:{due_date||'Not yet Paid'}</div>
                <div>List of Expenses</div>
                <table border={1} className="table w-full">
                    <tr className="bg-green-900 text-white">
                        <td>S/N</td>
                        <td>Amount</td>
                        <td>Reason</td>
                        <td align="center" className="bg-red-500">Delete</td>
                    </tr>
                    {Array.isArray(expensestwo) && expensestwo.length > 0 &&
                                        expensestwo.map((expense, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{expense.amount}</td>
                                                <td>{expense.reason}</td>
                                                <td className="cursor-pointer"><div onClick={()=>handledelete(i,index,item.id)}><i class="fa text-red-500  fa-trash" aria-hidden="true"></i>Delete</div></td>
                                            </tr>
                                        ))}

                    <tr>
                        <td colSpan={2}><span className="text-red-500">Total Expenses:</span>N{amountnew}</td>
                    </tr>
                </table>
                <div className="flex justify-between">
                    <div>
                    <button onClick={()=>{(setshowExpense(true));handleid(item.id,item.rent_fees,payment_date,due_date)}} className="bg-green-900 text-white rounded-xl px-5">Enter Expenses</button>

                    </div>
                  

                </div>
                <div>
                <div>Payment Record</div>
                <table border={1} className="table w-full">
                    <tr className="bg-green-900 text-white">
                        <td>S/N</td>
                        <td>Amount</td>
                        <td>Payment Date</td>
                    </tr>
                    {Array.isArray(dueamount) && dueamount.length > 0 &&
                                        dueamount.map((amountnewt, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{amountnewt.amount}</td>
                                                <td>{amountnewt.datepayment}</td>
                                            </tr>
                                        ))}

                    <tr>
                        <td colSpan={2}><span className="text-red-500">Total Payment:</span>N{pays}</td>
                    </tr>
                </table>
                <div>
                    <button onClick={()=>{setshowAmount(true);handleid(item.id,item.rent_fees,payment_date,due_date)}} className="bg-green-900 text-white rounded-xl px-5">Enter Amount Due</button>

                    </div>
                    <span className="text-green-900">Amount Due for Collection:</span>N{pay_due}
                </div>
                <div className="text-green-900 text-xl">
                    {paystatus==1?'Payment Paid':'Payment Not Yet Paid' }
                </div>
                <div>
                    <button onClick={()=>{setshowpaymentstatus(true);handleid(item.id,item.rent_fees,payment_date,due_date)}} className="bg-yellow-500 rounded-xl w-full py-2">Payment Status</button>
                </div>
                
                
            </div>)})}

            </div>
            <div className="bg-green-900 h-12 mt-2 flex justify-center gap-5 items-center text-white">

                <div>Total Payment Collected:N{totalpayment}</div> 
                <div className="text-xs">Last Payment Date:12th December,2024</div>
            </div>
            


            </div>

        </div>
    )
}
export default ClientPayout