import api from '../api/api';
import statelga from '../jsonfiles/nigeria&lga&state.json';
import { useEffect, useState } from 'react';
const Settings = ({auth,showsettings}) => {
    const [StateOrigin,setStateOrigin]=useState('')
    const [lgadatas,setlgadatas]=useState([])
    const [address,setaddress]=useState('')
    const [lga,setlga]=useState('')
    const [datauser,setdatauser]=useState('')
    const [errormsg,seterrormsg]=useState('')
    useEffect(()=>{
        if(StateOrigin){
        const lgadata=statelga.filter((item)=>(
          item.state===StateOrigin
    
        ))
        setlgadatas(lgadata[0].lgas)
        
        }
       
        
    
      },[StateOrigin])
      const fetchdata=async()=>{
        const data={value:localStorage.getItem('newauth')}
        try{
            const response=await api.post('/api/selectuser/',data)
            const datares=response.data.data
            setdatauser(datares)

        }catch(error){

        }
        

      }   
      const updatefunc=async()=>{
        const data={address:address,state:StateOrigin,lga:lga}
        const mobileno=localStorage.getItem('newauth')
        const response=await api.put(`/api/updateuser/${mobileno}`,data)
        const datares=response.data.message
        if(datares==='Record updated successfully'){
            seterrormsg('Updated Successfully')
        }

      }
      useEffect(()=>{
        fetchdata()

      },[])
      const handleshow=()=>{
        showsettings(false)
      } 
    return (
        <div className="w-screen h-screen flex justify-center bg-white">
            <div>
                <div className='mt-2'><i onClick={handleshow} class="fa cursor-pointer fa-2x fa-arrow-circle-left text-yellow-500" aria-hidden="true"></i></div>
                <div className='text-2xl flex justify-center text-green-900'><div><div><i class="fa fa-cogs" aria-hidden="true"></i>Settings</div><div className='h-2 w-12 bg-green-900'></div></div></div>
                <div className='mt-20 border-b-2 border-b-slate-400 pb-5 '>
                   <div className='mt-3'>Name: <span className='font-bold'>{(datauser.firstname+' '+datauser.lastname)||'Not Available'}</span></div>
                   <div className='mt-3'>Occupation: <span>{datauser.occupation||'Not Available'}</span></div>
                   <div className='mt-3'>Mobile No: <span>{datauser.mobileno ||'Not Available'}</span></div>
                   <div className='mt-3'>Email: <span>{datauser.email ||'Not Available'}</span></div>

                </div>
                <div className="flex justify-center mt-5">
                    <div>
                    <div className="bg-green-900 px-5 py-2 text-white">
                    Update Contact Information
                </div>
                <div className='mt-2'>{errormsg}</div>

                    </div>
              
                </div>
                <div className='mt-2'>
                    <div>Address:</div>
                    <textarea onChange={(e)=>setaddress(e.target.value)} className='outline-0 border h-8 rounded-lg w-full'></textarea>
                    <div>State:</div>
                    <select 
               onChange={(e)=>setStateOrigin(e.target.value)}
              className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'>
                <option>Choose </option>
               {statelga.map((pick,index)=>(<option key={index}>{pick.state}</option> ))}
              </select>
                    <div>LGA:</div>
                    <select 
               onChange={(e)=>setlga(e.target.value)}
              className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'>
              <option>Choose </option>
               {lgadatas.map((pick)=>(<option>{pick}</option>))} 
              </select>
              <div className='mt-3 flex justify-center'>
              <button onClick={updatefunc} className='bg-yellow-500 text-green-900 rounded-lg px-5 h-8'>Update</button>

              </div>
            


                   
                </div>

                
               


            </div>

        </div>

    )
}
export default Settings