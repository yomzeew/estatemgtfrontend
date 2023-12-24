import { useEffect, useState } from 'react'
import api from '../../api/api'
import house from '../image/Real-Estate-2.jpg'
const TenantPaymentRecord=()=>{
    const [data,setdata]=useState([])
    const [datatenant,setdatatenant]=useState([])
    const [datapayment,setdatapayment]=useState([])
    const [dataproperty,setdataproperty]=useState([])
    const [showdialogbox,setshowdialogbox]=useState(false)
    const [showdialogboxtwo,setshowdialogboxtwo]=useState(false)
    const [tenantid,settenantid]=useState('')
    const [advancefees,setadvancefees]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const [totalfees,settotalfees]=useState('')
    const [propertid,setpropertyid]=useState('')
    const [Base64String,setBase64String]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    
    const searchinput=async(e)=>{
        const data={value:searchvalue}
        try{
            const response=await api.post('/api/searchinput',data)
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdata(datares)

            }
            else{
                setdata([])
            }
          


        }catch(error){

        }
    
    }

    const fetchdata=async()=>{
       try{
        const response=await api.get('/api/selectallrent')
        const datares=response.data.data
        console.log(datares)
        setdata(datares)

       }catch(error){
        

       } 
    }
    const fetchtenant=async()=>{
        try{
            const response=await api.get('/api/selectall')
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdatatenant(datares)

            }
            else{
                setdatatenant([])
            }
          


        }catch(error){

        }
    }
    const fetchpayment=async()=>{
        try{
            const response=await api.get('/api/selectallpayment')
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdatapayment(datares)

            }
            else{
                setdatapayment([])
            }
          


        }catch(error){

        }
    }
    const fetchproperty=async()=>{
        try{
            const response=await api.get('/api/selectproperty')
            const datares=response.data.data
            console.log(datares)
            if(datares.length>0){
                setdataproperty(datares)

            }
            else{
                setdataproperty([])
            }
          


        }catch(error){

        }
    }
    
    
    useEffect(()=>{
        fetchproperty()
        fetchpayment()
        fetchtenant()
        fetchdata()
        

    },[])
    const handlepay=(x,y,z,w)=>{
        setshowdialogbox(true)
        settenantid(x)
        settotalfees(y)
        setpropertyid(z)
 
        

    }
   
    const addformfunction=async()=>{
        const response=await api.get('/api/selectallrent')
            const datares=response.data.data
            const datauser=datares.filter((item)=>(
                item.tenant_id===tenantid
            
                ))
            const agentfee=datauser[0].agent_fees
            const rentfee=JSON.parse(datauser[0].rent_fees)
           
            const agreementfees=datauser[0].agreement
            //check paymentstatus
            let paymentstatus
            if(advancefees<(parseInt(totalfees))){
                paymentstatus='incomplete'

            }
            else{
                paymentstatus='complete'

            }
            const getrentfee=JSON.parse(advancefees)-((JSON.parse(agentfee))+(JSON.parse(agreementfees)))
            //GET DAYS
            const noofyear=getrentfee/rentfee
            const noofdays=Math.round(noofyear * 365)
            const getyear=new Date().getFullYear()
            let getmonth=new Date().getMonth()+1
            getmonth=getmonth.toString().padStart(2,'0')
            let getdate=new Date().getDate()
            getdate=getdate.toString().padStart(2,'0')
            const payment_date=getyear+"-"+getmonth+"-"+getdate
            //get due date
            let timestamp=noofdays*24*60*60*1000
            const currenttimestamp= new Date().getTime()
            timestamp=timestamp+currenttimestamp
            const dueyear=new Date(timestamp).getFullYear()
            let duemonth=new Date(timestamp).getMonth()+1;
            duemonth=duemonth.toString().padStart(2,'0')
            let duedate=new Date(timestamp).getDate()
            duedate=duedate.toString().padStart(2,'0')
            const duepaymentdate=dueyear+'-'+duemonth+'-'+duedate
            console.log(duepaymentdate)
            console.log(totalfees)
        const data={tenant_id:tenantid,property_id:propertid,total_fees:JSON.parse(totalfees),advance_payment:advancefees,rent_days:noofdays,payment_status:paymentstatus,payment_date:payment_date,due_date:duepaymentdate}
        console.log(data)
        try{
            const response=await api.post('/api/addtenantpayment',data)
            const datares=response.data.message
            if(datares==='successfully'){
                seterrormessage('Payment Added')
                setadvancefees('')
            }
            else{
                console.log('not added')
            }

        }catch(error){
            console.error(error)
            if (error.response && error.response.status===422){
                seterrormessage('Already make payment')

            }


        }
        const datatwo={payment_status:paymentstatus,payment_date:payment_date}
        try{
            
            const response=await api.put(`/api/updaterentstatus/${propertid}`,datatwo)
            const datares=response.data.message
            if(datares==='Successfully updated'){
                seterrormessage('Payment Added')
               
            }
            else{
                seterrormessage('No changes made or update not successful')
                console.log('No changes made or update not successful')
            }

        }catch(error){
            console.error(error)
            if (error.response && error.response.status===422){
                seterrormessage('Already make payment')

            }
        

    }
}
    const updateform=async()=>{
        // the previous advancefees
        // get the previous advancefees
        // get the previous payment date
        // get the rent fees/{tenantid}
        // get total fees
        const response=await api.get('/api/selectallrent')
        const datares=response.data.data
        const datauser=datares.filter((item)=>(
            item.tenant_id===tenantid
        
            ))
        const agentfee=datauser[0].agent_fees
        const rentfee=JSON.parse(datauser[0].rent_fees)
       
        const agreementfees=datauser[0].agreement
        //check paymentstatus 
        let advancefeesupdate
        let payment_dateupdate
        let getlatestupdate
        
            const responsetwo=await api.get(`/api/selectpayment/${tenantid}`)
            const datarestwo=responsetwo.data.data
            console.log(datarestwo)
            if(datares.length>0){
                advancefeesupdate=datarestwo.advance_payment
                payment_dateupdate=datarestwo.payment_date

                getlatestupdate=JSON.parse(advancefeesupdate)+JSON.parse(advancefees)

              
            }
          
    
        const getrentfee=getlatestupdate-((JSON.parse(agentfee))+(JSON.parse(agreementfees)))
        let paymentstatus
        if(getlatestupdate<(parseInt(totalfees))){
            paymentstatus='incomplete'

        }
        else{
            paymentstatus='complete'
        }
        const noofyear=getrentfee/rentfee
            const noofdays=Math.round(noofyear * 365)
        let timestamp=noofdays*24*60*60*1000
        console.log(payment_dateupdate)
        const previoustimestamp= new Date(payment_dateupdate).getTime()
        timestamp=timestamp+previoustimestamp
        const dueyear=new Date(timestamp).getFullYear()
        let duemonth=new Date(timestamp).getMonth()+1;
        duemonth=duemonth.toString().padStart(2,'0')
        let duedate=new Date(timestamp).getDate()
        duedate=duedate.toString().padStart(2,'0')
        const duepaymentdate=dueyear+'-'+duemonth+'-'+duedate
        console.log(duepaymentdate)
        const datatwo={advance_payment:getlatestupdate,rent_days:noofdays,payment_status:paymentstatus,due_date:duepaymentdate}
        try{
            const response=await api.put(`/api/updatepaymentrec/${tenantid}`,datatwo)
            const datares=response.data.message
            if(datares==='Successfully updated'){
                seterrormessage('Payment Added')
               
            }
            else{
                seterrormessage('No changes made or update not successful')
                
            }
            

        }catch(error){
            console.error(error)
        }
        const datathree={payment_status:paymentstatus}
        try{
            
            const response=await api.put(`/api/updaterentstatus/${propertid}`,datathree)
            const datares=response.data.message
            if(datares==='Successfully updated'){
                seterrormessage('Payment Added')
                
                
               
            }
            else{
                seterrormessage('Payment Added')
                setadvancefees('')
              
                
               
            }

        }catch(error){
            console.error(error)
            if (error.response && error.response.status===422){
                seterrormessage('Already make payment')

            }
        

    }


    }
    const handleaddpay=async()=>{
        seterrormessage('')

        if(!advancefees){
            seterrormessage('Enter Amount');
            return
        };
        try{
            const response=await api.get(`/api/checktenantid/${tenantid}`)
            const datares=response.data.message
            console.log(datares)
            if(datares==='ok'){
                updateform()
               
            }
            else if(datares==='not ok'){
                addformfunction()
           


            }
               
        }
        catch(error){
            console.log(error)
           
           
        }
       

        
            
       
    }
    const handleagreement=(x)=>{
        settenantid(x)
        setshowdialogboxtwo(true)

    }
    const handlefile=(e)=>{
        const selectedFile=e.target.files[0]
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64Result = e.target.result.split(',')[1];
              setBase64String(base64Result);
            };
            reader.readAsDataURL(selectedFile);
          } else {
            setBase64String('');
          }

    }
    const handleaddfile=async()=>{
        const datatwo={agreementfile:Base64String}
        try{
            const response=await api.put(`/api/updatepaymentrec/${tenantid}`,datatwo)
            const datares=response.data.message
            if(datares==='Successfully updated'){
                seterrormessage('Upload Image')
               
            }
            else{
                seterrormessage('No changes made or update not successful')
                
            }
            

        }catch(error){
            console.error(error)
        }

    }
    

    return(
        <div>
            <div className="w-64 md:w-550">
                
                <div>
                <div className='mb-3'>
                <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                <input onChange={(e)=>setsearchvalue(e.target.value)} placeholder='search by name, tenant id and payment status ' className="md:w-96 w-56 h-8 outline-0 border rounded-2xl px-7"/>
                <button onClick={searchinput} className='bg-yellow-500 px-3 rounded-2xl'>Search</button>
            </div>
            <div className='flex justify-center'>
            {showdialogbox &&<div className='absolute bg-white rounded-lg h-44 top-40 w-64 md:w-72 flex flex-col justify-center items-center'>
                <div className='px-3'>
                    <div className='text-sm text-red-500'>{errormessage}</div>
                    <div className='flex justify-between'>
                        <div>Tenant ID:#{tenantid}</div>
                        <div><i onClick={()=>{setshowdialogbox(false); fetchproperty();fetchpayment();fetchtenant();fetchdata()}
} class="fa fa-times-circle cursor-pointer  text-red-500" aria-hidden="true"></i></div>

                        </div>
                    <div className='mt-5'>Enter Amount</div>
                    <input onChange={(e)=>{setadvancefees(e.target.value)}} className='h-8 w-full outline-0 border' />
                    <div className='flex justify-center'>
                    <button onClick={handleaddpay} className='bg-yellow-500 text-green rounded-xl h-8 w-44 mt-3'>Submit</button>

                    </div>
                    

                </div>
                 

                </div>}
                {showdialogboxtwo && <div className='absolute bg-white rounded-lg h-44 top-40 w-64 md:w-72 flex flex-col justify-center items-center'>
                <div className='px-3'>
                    <div className='text-sm text-red-500'>{errormessage}</div>
                    <div className='flex justify-between'>
                        <div>Tenant ID:#{tenantid}</div>
                        <div><i onClick={()=>setshowdialogboxtwo(false)} class="fa fa-times-circle cursor-pointer  text-red-500" aria-hidden="true"></i></div>

                        </div>
                    <div className='mt-5'>Upload Agreement File</div>
                    <input type='file' onChange={(e)=>{handlefile(e)}} className='h-8 w-full outline-0 border' />
                    <div className='flex justify-center'>
                    <button onClick={handleaddfile} className='bg-yellow-500 text-green rounded-xl h-8 w-44 mt-3'>Submit</button>

                    </div>
                    

                </div>
                 

                </div>

                }

            </div>
           
                <div className="border border-black border-dashed rounded-2xl h-567 overflow-y-scroll   px-3 ">
                <div className="justify-center flex">
                <div className="bg-green-900 w-64 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Tenant Payment Record
                </div>
             
                </div>
                {data.length>0&&data.map((item,index)=>{
                    const tenant_id=item.tenant_id
                    const agreementfees=item.agreement
                    const agent_fees=item.agent_fees
                    const rentfee=item.rent_fees
                    let advancefees
                    let rent_days
                    let firstname
                    let lastname
                    let propertyimage
                    if (dataproperty.length>0){
                        const dataproper=dataproperty.filter((item)=>(
                            dataproperty.id===item.property_id
                        ))
                        const image=JSON.parse(dataproper[0].images_base64)
                        propertyimage=image[0]

                    }
                  
                    if(datapayment.length>0){
                       const datatranc=datapayment.filter((item)=>(
                            item.tenant_id===tenant_id
                        ))
                        console.log(datatranc)
                        if( datatranc.length>0){
                    advancefees=datatranc[0].advance_payment
                    rent_days=datatranc[0].rent_days
                        }
                   
                    }
                   
                   
                  
                    const datauser=datatenant.filter((item)=>(
                        item.id===tenant_id
                    ))
                    if(datauser.length>0){
                     firstname=datauser[0].firstname
                     lastname=datauser[0].lastname
                    }


                    return(
                        <div className='h-96 overflow-y-scroll mt-3 py-5 rounded-2xl bg-slate-200 px-3'>
                        <div className='flex justify-center'>
                        <img src={propertyimage} className='h-44 object-contain ' />
                        </div>
                        <div className='flex justify-between text-green-900'>
                        <div>Property ID: #{item.property_id}</div>
                        <div>Tenant ID: #{item.tenant_id}</div>
                        </div>
                        <div>
                            <div><span className='font-bold'>Name:</span> <span className='text-xl'>{lastname} {firstname}</span></div>
                            <div className='flex justify-between text-sm flex-wrap'>
                            <div>
                                <span className=''>Payment Status:</span><span className='bg-red-500 text-white'>{item.payment_status}</span>
                                </div>
                            <div>
                                <span className=''>Rent Payment Date:{item.payment_date===null?0:item.payment_date}</span><span></span>
                                </div>
    
                            </div>
                            <div className='flex justify-between text-sm flex-wrap '>
                            <div><span className=''>Rent Days:</span><span>{rent_days||0}day(s)</span></div>
                            <div><span className=''>Total fees:</span><span>{item.total_fees}</span></div>
                            </div>
                            <div><span className=''>Advance fees:</span><span>{advancefees||0}</span></div>
                            <div className='flex justify-between'>
                            <button onClick={()=>handlepay(item.tenant_id,item.total_fees,item.property_id)} className='bg-green-900 text-white w-56 h-8 rounded-lg text-xs'>Make Payment</button>
                            {item.payment_status==='complete'&&<button onClick={()=>handleagreement(item.tenant_id)} className='bg-green-900 text-white w-56 rounded-lg text-xs h-8'>Send Agreement</button>}
    
                            </div>
                            
                        </div>
                       
                    </div>

                    )
                })
               }


                </div>

                </div>
           
                </div>

        </div>
    )
}
export default TenantPaymentRecord