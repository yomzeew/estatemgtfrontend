import { useEffect, useState } from "react"
import api from "../../api/api"
import Propertyform from "./addproperty"
import ViewProperty from "./viewproperty"
const SelectClient=()=>{
    const [name,setname]=useState('')
    const [clientid,setclientid]=useState(0)
    const [data,setdata]=useState([])
    const [searchvalue,setsearchvalue]=useState('')
    const [showlistclient,setshowlistclient]=useState(true)
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [showaddblock,setshowaddblock]=useState(false)
    const [address,setaddress]=useState('');
    const [description,setdescription]=useState('')
    const [errormsg,seterrormsg]=useState('')
    const [successmsg,setsuccessmsg]=useState('')
    const [groupproperty, setgroupproperty]=useState([])
    const [nofblocks ,setnofblocks]=useState(0)
    const [blockid, setblockid]=useState('')
    const [addressblock,setaddressblock]=useState('')
    const [showviewproperty,setshowviewproperty]=useState(false)
    const [expensesall,setexpensesall]=useState([])
    const [totalrentall,settotalrentall]=useState([])
    const [TotalGrand,setTotalGrand]=useState('')
    const [TotalGrandExp,setTotalGrandExp]=useState('')

    const [showaddproperty,setshowaddproperty]=useState(false)

    const fetchdata=async()=>{
        try{
            const response=await api.get('/api/selectallclient')
            const datares=response.data.data
            setdata(datares)

        }catch(error){
            console.error(error)
        }

    }
    const fetchallblock=async()=>{
        const response=await api.get(`/api/selectallgroup/${clientid}`)
        const datares=response.data.data
        setgroupproperty(datares)
        setnofblocks(datares.length)

    }
    useEffect(()=>{
        fetchallblock()

    },[clientid])
    useEffect(()=>{
        fetchdata()
        
    },[])
    const handlesearch=(e)=>{
        const value=e.target.value
        setsearchvalue(value)
    }
    const searchbtn=()=>{
        if(searchvalue){
            const newdata=data.filter((item)=>(
                item.lastname.toLowerCase().includes(searchvalue.toLowerCase())||
                item.firstname.toLowerCase().includes(searchvalue.toLowerCase())
            )
            )
            console.log(newdata)
    
            setdata(newdata)

        }
       

    }
    const handleview=(id,lastname,firstname)=>{
        setshowlistclient(false)
        setclientid(id)
        setlastname(lastname)
        setfirstname(firstname)

    }
    const handleaddgroup=()=>{
        setshowaddblock(true)

    }
    const handleaddbtn=async()=>{
        if(!address){
            seterrormsg('Please enter Address')
            return
        }
        if(!description){
            seterrormsg('Please enter description')
            return
        }
        try{
            const data={client_id:clientid,address:address,description:description};
            const response=await api.post('/api/insertgroup',data)
            const datares=response.data.message
           
            if(datares==='Added'){
                console.log(datares)
                setsuccessmsg("successfully add new property")
                setaddress('');
                setdescription('')
               

            }

        }catch(error){

        }
        seterrormsg('')
    }
    const handleshowadd=(value,valuetwo)=>{
        setshowaddproperty(true)
        setblockid(value)
        setaddressblock(valuetwo)
        
    }
    const handleshowview=(value)=>{
        setshowviewproperty(true)
        setblockid(value)
       
    }
    const fetchallexpenses=async()=>{
        try{
            const response=await api.get('/api/selectexpall')
            const datares=response.data.data
            let totalgrandexp=0
            if(datares.length>0){
                const getdataarray=datares.filter((exp)=>(
                    exp.client_id===clientid

                ))
                
                getdataarray.length>0&&getdataarray.map((itemrent,index)=>{
                    const expenses=JSON.parse(itemrent.expenses)
                    totalgrandexp=totalgrandexp+expenses
                    setTotalGrandExp(totalgrandexp)
                })
                setexpensesall(datares)
                console.log(datares)
                console.log(getdataarray)
            }

        }catch(error){

        }
    }
    useEffect(()=>{
        fetchallexpenses()
    

    },[clientid])
    ///selectproperty
    const fetchallrent=async()=>{
        try{
            const response=await api.get('/api/selectproperty')
            const datares=response.data.data
            let totalgrandfees=0
            if(datares.length>0){
                const getdataarray=datares.filter((rent)=>(
                    rent.client_id===clientid

                ))
                
                getdataarray.length>0&&getdataarray.map((itemrent,index)=>{
                    const rentfees=JSON.parse(itemrent.rent_fees)
                    totalgrandfees=totalgrandfees+rentfees
                    setTotalGrand(totalgrandfees)
                })
                settotalrentall(datares)
            }
        }catch(error){

        }
    }
    useEffect(()=>{
        fetchallrent()

    },[clientid])


    return(
        <div className="w-64 md:w-1200">
          
            {showlistclient &&<div className="border border-black border-dashed rounded-2xl bg-slate-200 h-550 px-3 ">
                <div className="justify-center flex">
                <div className="bg-green-900 w-64 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Client and Property
                </div>
             
                </div>
                <div className="text-xs text-center">
                   Search Client by Name or Client id
                </div>
                <div className='flex justify-center'>
                    <div>
                    <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                   <input onChange={handlesearch} className="md:w-72 w-52 h-8 outline-0 border rounded-2xl px-7"/>
                   <button onClick={searchbtn} className="bg-green-900 rounded-lg py-1 px-2 text-yellow-500"><i class="fa fa-search" aria-hidden="true"></i>Search</button>

                    </div>
                
            </div>
            <div className="h-500 overflow-y-scroll">
           {data.length>0 &&data.map((items,index)=>(
           <div className="bg-slate-300 mt-3">
                <div className="flex justify-between px-5 py-2">
                <div className="text-xs flex justify-between w-full">
                    <div>{(items.firstname).toUpperCase()}{(items.lastname).toUpperCase()}</div>
                    <div><button onClick={()=>handleview(items.id,items.lastname,items.firstname)} className="bg-green-900 text-yellow-500 rounded-xl px-2 py-1">View Property</button></div>
                    </div>
                </div> 
            </div>
            )) }
            </div>
            

            </div>}
            {!showlistclient &&<div>
                {showaddblock&&
                <div className="flex justify-center">
                         <div className="md:w-96 w-64 absolute bg-white z-50 px-5 py-3 rounded-xl">
                            <div className="flex justify-end"><div className="cursor-pointer text-red-500" onClick={()=>{setshowaddblock(false)}}><i class="fa fa-times" aria-hidden="true">Close</i></div></div>
                    <div>
                        <div className="flex justify-center h-8 rounded-xl bg-green-500 items-center">Add Blocks of Properties</div>
                        <div className="text-center text-red-500 text-xs mt-3">{errormsg}</div>
                        <div className="text-center text-green-500 text-xl mt-3">{successmsg}</div>
                   
                        <div className="mt-3">Address</div>
                        <input value={address} onChange={(e)=>setaddress(e.target.value)} className="outline-0 border rounded-xl w-full h-12" type="text" />
                        <div>Description<span className="text-xs">(e.g '6 Block of Flats')</span></div>
                        <input value={description} onChange={(e)=>setdescription(e.target.value)} className="outline-0 border rounded-xl w-full h-12" type="text" />
                        <div className="mt-3"><button onClick={handleaddbtn} className="bg-yellow-500 text-green-900 rounded-xl w-full py-3">Add</button></div>
                    


                    </div>

                </div>

                </div>

           

                }
            {showaddproperty && 
            <div className="flex justify-center">
                <div className="absolute z-50 md:w-96 w-64 ">
                <div>
                <div><button onClick={()=>setshowaddproperty(false)} className="text-red-500"><i class="fa fa-times" aria-hidden="true"></i>Close</button></div>
                <Propertyform
                getid={clientid}
                block_id={blockid}
                getaddress={addressblock}

                />
                </div>
                </div>

            </div>
            

             }
                 {showviewproperty && 
            <div className="flex justify-center">
                <div className="absolute z-50 md:w-750 w-64 ">
                <div>
                <div><button onClick={()=>setshowviewproperty(false)} className="text-red-500"><i class="fa fa-times" aria-hidden="true"></i>Close</button></div>
                <ViewProperty
                getid={clientid}
                block_id={blockid}

                />
                </div>
                </div>

            </div>
            

             }
            
                <div className={showviewproperty||showaddproperty||showaddblock?'blur-lg':''}>
                    <button className="bg-yellow-500 text-green-900 mb-4 px-5 py-2 "><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>Back</button>
            <div className="flex justify-between rounded-2xl py-2 px-3 bg-green-900">
                <h3 className=" text-yellow-500">{lastname}{firstname}</h3>
                <div className="text-xs text-white">Client ID:{clientid}</div>
            </div>
            <div className="flex flex-wrap justify-between border-b border-b-slate-300">
            <div>
                
                <div>Total Rent Fees: <span className="font-bold text-green-500">N{TotalGrand}</span></div>
                <div>Grand Total Amount due: <span className="font-bold">N300000</span></div>
                <div>Grand Total Expenses: <span className="text-red-500 font-bold">N{TotalGrandExp}</span></div>
                <div>No of Blocks:<span className="font-bold">{nofblocks}</span></div>

            </div>
            <div className="md:mt-5">
            <button onClick={handleaddgroup} className="bg-yellow-500 flex justify-center py-2 rounded-2xl px-5"><i class="fa fa-plus" aria-hidden="true"></i>Add Blocks(Flats)</button>
                </div>

            </div>
            <div className="mt-5 flex justify-between gap-3 flex-wrap overflow-y-scroll h-400">
                {groupproperty.length>0 &&groupproperty.map((items,index)=>{
                    let totalexpenses=0
                   const getexpensesarry=expensesall.filter((exp)=>(
                    exp.properties_group===items.id

                   ))
                   getexpensesarry.length&&getexpensesarry.map((exps)=>{
                    const expstotal=JSON.parse(exps.expenses)
                    totalexpenses=totalexpenses+expstotal

                   })
                   let totalrent=0
                   const getrentarry=totalrentall.filter((rent)=>(
                    rent.properties_group===items.id&&rent.client_id===clientid

                   ))
                   getrentarry.length&&getrentarry.map((rent)=>{
                    const renttotal=JSON.parse(rent.rent_fees)
                    totalrent=totalrent+renttotal

                   })
                
                 


                    return(
                <div className="bg-slate-200 rounded-lg  border-dashed border md:w-96 w-64 px-3 py-3 h-48 ">
                    <div className="flex justify-end text-xs">Blocks ID:{items.id}</div>
                    <div className="flex justify-between">
                        <div>
                    <div className="text-sm">Address:<span>{(items.address).toUpperCase()}</span></div>
                    <div>Total Rent fess:<span className="text-green-900 font-bold">N{totalrent}</span></div>
                    <div>Total Amount Due:<span className="text-green-900 font-bold">N500000</span></div>
                    <div>Total Expenses:<span className="text-red-500 font-bold">N{totalexpenses}</span></div>
                    <div>No of Properties:{getrentarry.length||0}</div>

                        </div>
                        <div>
                            <div><button onClick={()=>handleshowview(items.id)}  className="bg-yellow-500 py-1 text-green-900 rounded-lg px-3">View Property</button></div>
                            <div onClick={()=>handleshowadd(items.id,items.address)} className="mt-3"><button className="bg-green-900 py-1 text-yellow-500 rounded-lg px-3"><i class="fa fa-plus" aria-hidden="true"></i>Add Property</button></div>
                        </div>
                    </div>
                    
                </div>)})}
                {groupproperty<1 && <div className="text-center text-2xl">No Record Found</div>}
          
               
   
            </div>

            </div>
            </div>
            }
        
           

        </div>

    )
}
export default SelectClient