import {React, useEffect, useRef, useState} from 'react';
import logo from './images/logo.png';
import api from './api/api'
import statelga from './jsonfiles/nigeria&lga&state.json'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Register() {
  const [index,setindex]=useState(0)
  const [shownext,setshownext]=useState(true)
  const [showprevious,setshowprevious]=useState(false)
  const [FirstName,setFirstName]=useState('')
  const [LastName,setLastName]=useState('')
  const [Occupation,setOccupation]=useState('')
  const [status,setstatus]=useState('')
  const [address,setaddress]=useState('')
  const [StateOrigin,setStateOrigin]=useState('')
  const [lga,setlga]=useState('')
  const [Email,setEmail]=useState('')
  const [MobileNo,setMobileNo]=useState('')
  const [AltMobileNo,setAltMobileNo]=useState('')
  const [Password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')
  const [Nextofkinname,setNextofkinname]=useState('')
  const [Nextofkinno,setNextofkinno]=useState('')
  const [Nextofkinaddress,setNextofkinaddress]=useState('')
  const [Privacy,setPrivacy]=useState(false)
  const [errormessage,seterrormessage]=useState('')
  const [lgadatas,setlgadatas]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    if(StateOrigin){
    const lgadata=statelga.filter((item)=>(
      item.state===StateOrigin

    ))
    setlgadatas(lgadata[0].lgas)
    
    }
   
    

  },[StateOrigin])

  const dataform=[
    {
      "title": "Personal Information",
      "fields": [
        {
          "label": "First Name:",
          "placeholder": "First Name",
          "checkbox": false,
          "setState":setFirstName,
          "State":FirstName
        },
        {
          "label": "Last Name:",
          "placeholder": "Last Name",
          "checkbox": false,
          "setState":setLastName,
          "State":LastName
        },
        {
            "label": "Occupation:",
            "placeholder": "Occupation",
            "checkbox": false,
            "setState":setOccupation,
            "State":Occupation
          },
          {
            "label": "Marital Status:",
            "placeholder": "status",
            "checkbox": false,
            "setState":setstatus,
            "State":status
          },
        {
          "label": "Address:",
          "placeholder": "Address",
          "checkbox": false,
          "setState":setaddress,
          "State":address,
          "inputtype":false
        },
        {
            "label": "State:",
            "placeholder": "State",
            "checkbox": false,
            "setState":setStateOrigin,
            "State":StateOrigin,
            "inputtype":true
          },
          {
            "label": "LGA:",
            "placeholder": "LGA",
            "checkbox": false,
            "setState":setlga,
            "State":lga,
            "inputtype":true
          }
      ]
    },
    {
      "title": "Contact Information",
      "fields": [
        {
            "label": "Email:",
            "placeholder": "Email",
            "checkbox": false,
            "setState":setEmail,
            "State":Email,
            "inputtype":false
          },
        {
          "label": "Mobile No:",
          "placeholder": "Mobile No",
          "checkbox": false,
          "setState":setMobileNo,
          "State":MobileNo,
          "inputtype":false
        },
        {
            "label": "Alternative Mobile No:",
            "placeholder": "Mobile No",
            "checkbox": false,
            "setState":setAltMobileNo,
            "State":AltMobileNo,
            "inputtype":false
          }
      ]
    },
    {
      "title": "Password",
      "fields": [
        {
          "label": "Passcode:",
          "placeholder": "Passcode",
          "secureTextEntry": true,
          "checkbox": false,
          "setState":setPassword,
          "State":Password,
          "inputtype":false

        },
        {
            "label": "Confirm Passcode:",
            "placeholder": "Confirm Passcode",
            "secureTextEntry": true,
            "checkbox": false,
            "setState":setConfirmPassword,
            "State":ConfirmPassword,
            "inputtype":false
          }
      ]
    },
    {
        "title": "Next of Kin",
        "fields": [
          {
            "label": "Full Name",
            "placeholder": "Full Name",
            "checkbox": false,
            "setState":setNextofkinname,
            "State":Nextofkinname,
            "inputtype":false
            
            
            
          },
          {
            "label": "Mobile No",
            "placeholder": "Mobile No",
            "checkbox": false,
            "setState":setNextofkinno,
            "State":Nextofkinno,
            "inputtype":false
            
            
          },
          {
            "label": "Address",
            "placeholder": "Address",
            "checkbox": false,
            "setState":setNextofkinaddress,
            "State":Nextofkinaddress,
            "inputtype":false
            
            
          }
        ]
      },
    {
      "title": "Terms and Conditions",
      "fields": [
        {
          "label": "Privacy, Term & Condition",
          "checkbox": true,
          "setState":setPrivacy,
          "State":Privacy,
          "inputtype":false
          
        }
      ]
    }
  ]
  

  const handlenext=()=>{
  
    const datalength=dataform.length
    setshowprevious(true)
    if (index<datalength){
      setindex(prev=>prev+1)
      
    }
    if (index===(datalength-2)){
      setshownext(false)
    }
    console.log(index)
      
    }


  
  const handleprevious=()=>{
    setshownext(true)
    if(index>0){
      setindex(prev=>prev-1)
    }
    else{
      setshowprevious(false)
    }


  }
  const checkvalue=useRef()
  const handlecheckbox=()=>{
    if(checkvalue.current.checked){
      setPrivacy(true)
      
    }
    else{
      setPrivacy(false)


    }

  }
  const handleSubmit=async()=>{
    if (!FirstName){
      seterrormessage('Fill Your Firstname')
      return
    }
    if (!LastName){
      seterrormessage('Fill Your Lastname')
      return
    }
    if (!Occupation){
      seterrormessage('Fill Your Occupation')
      return
    }
    if (!status){
      seterrormessage('Fill Your Status')
      return
    }
    if (!StateOrigin){
      seterrormessage('Select Your State')
      return
    }
    if (!lga){
      seterrormessage('Select Your LGA')
      return
    }
    if (!address){
      seterrormessage('Fill Your Address')
      return
    }
    if (!Email){
      seterrormessage('Fill Your Email')
      return
    }
    if (!MobileNo){
      seterrormessage('Fill Your MobileNo')
      return
    }
    if (!AltMobileNo){
      seterrormessage('Fill Your Alternative MobileNo')
      return
    }
    const regex = /\d/;
     regex.test(Password);
    if(!regex.test(Password) && Password.length!==6){
      seterrormessage('Enter Only Number for Passcode or Passcode is not 6 digit')
      return

    }
    if (Password!==ConfirmPassword){
      seterrormessage('Password Not Match')
      return
    }

    if (!Nextofkinaddress||!Nextofkinname||!Nextofkinno){
      seterrormessage('Enter Your Next Kin Details')
      return
    }
    const nextofdata=[{Nextofkinname:Nextofkinname,Nextofkinno:Nextofkinno,Nextofkinaddress:Nextofkinaddress,}]
    const convertstring=JSON.stringify(nextofdata)
    const data={firstname:FirstName,lastname:LastName,address:address,state:StateOrigin,lga:lga,mobileno:MobileNo,altmobileno:AltMobileNo,email:Email,passcode:Password,occupation:Occupation,status:status,nextofkindetails:convertstring}
    try{
      const response=await api.post('/api/addtenant',data)
      const result=response.data.message
      if(result==='Successful'){
        seterrormessage('Registration Successful')
        setTimeout(() => {
          navigate('/loginpage');
        }, 3000);
      }
      else if(response.data.message==='Already Exist'){
        seterrormessage('Email or Mobileno Exist')
      }
      else {
        seterrormessage('Server Error')

      }


      }

    
    catch(error){
      console.error(error)

    }


    
    

  
    
  }
  useEffect(()=>{
    const handlefetch=async()=>{
      try {
        const response=await api.get('/api/selectall')
        console.log(response.data)
  
      }
      catch(error){
        console.error(error)
      }
  

    }
    handlefetch()
   
  },[])
  const handleback=()=>{
    navigate('/loginpage')
  }
  return (
    <div className='w-screen flex justify-center h-auto pb-5'>
      <div className='w-full'>

        <div className='w-full bg-gradient-to-t from-green-950 to-green-800 h-32 flex justify-between items-center px-5'>
          <div>
            <button onClick={handleback}><span className='fa fa-2x fa-arrow-left text-yellow-500'></span></button>
          </div>
          <div className='text-white text-xl text-center'>
            Welcome
          </div>
          <div>
            <img src={logo} className='w-16 lg:w-24 h-auto' />

          </div>

        </div>
        <div className='flex justify-center mt-3'>
          <div className='mb-3'>
            <div>Register New User</div>
           

            <div className='border-b-green-500 w-14 border-2'></div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
         <div>
          <div className='text-xs text-red-500 text-center'>{errormessage}</div>
            <div className='w-72 md:w-96 px-5 bg-green-950 text-yellow-500 flex justify-center h-8 rounded-lg items-center mt-5'>{dataform[index].title}</div>
            {dataform[index].fields.map((items,i)=>(
            <div key={i}>
              <div>

              </div>
          
           {items.inputtype?<div>
            {items.label==='State:'&&<div><div>{items.label}</div>
              <select 
               onChange={(e)=>items.setState(e.target.value)}
              className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'>
                <option>Choose </option>
               {statelga.map((pick,index)=>(<option key={index}>{pick.state}</option> ))}
              </select>
            </div>}
            {items.label==='LGA:'&&<div><div>{items.label}</div>
              <select 
               onChange={(e)=>items.setState(e.target.value)}
              className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96'>
              <option>Choose </option>
               {lgadatas.map((pick)=>(<option>{pick}</option>))} 
              </select>
            </div>}
            </div>:
            <div>
           {items.checkbox?<div>
              <div>{items.label}</div>
              <input
              onChange={handlecheckbox}
              ref={checkvalue}
               type='checkbox' 
               className='h-2 outline-0 border rounded-lg border-slate-300' />
              </div>:
              <div>
                  <div>{items.label}</div>
              <input 
              value={items.State}
               onChange={(e)=>{items.setState(e.target.value)}} 
              className='h-8 outline-0 border rounded-lg border-slate-300 w-72 md:w-96' />

              </div>
              }</div>


            }
            

            </div>))}
            
           


          </div>
          <div className='flex justify-between '>
              {showprevious &&<button onClick={handleprevious}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>Previous</button>}
              {shownext?
                <button onClick={handlenext}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> Next</button>
                :<button className='bg-yellow-500 px-3 rounded-lg' onClick={handleSubmit}> Submit</button>
                }
            </div>
            </div>

        </div>


      </div>

    </div>
  );
}

export default Register;
