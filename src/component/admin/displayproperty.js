import { useEffect, useRef, useState } from 'react'
import api from '../api/api'
import RealEstate from './image/Real-Estate-2.jpg'
import Loader from '../loader'

const Displayproperty=({showtenant,propertyid})=>{
    const[data,setdata]=useState([])
    const [newimage,setnewimage]=useState([])
    const [viewimage,setviewimage]=useState(false)
    const [searchvalue,setsearchvalue]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const [checked,setchecked]=useState(true)
    const [showloader,setshowloader]=useState(false)

    const checkedRefone=useRef(null)
    const checkedReftwo=useRef(null)
 
  
 
    const fetchdata=async()=>{
        setshowloader(true)
        try{
            const response=await api.get('/api/selectproperty')
            const datares=response.data.data
            setdata(datares)


        }catch(error){

        }
        finally{
            setshowloader(false)
        }
      

    }
    useEffect(()=>{
        fetchdata()

    },[])
    const handlenotavailable=async(e)=>{
        if(e.target.checked===true){
            const value='Not Available'
            setsearchvalue(value)
            const datatwo={value:value}
            try{
                const response=await api.post('/api/searchinputproperty',datatwo)
                const datares=response.data.data
                console.log(datares)
                checkedRefone.current.checked=!checked
                if(datares.length>0 && datares!=='undefined'){
                    setdata(datares)
                    
                    seterrormessage('')
    
                }
                else{

                    seterrormessage('Record not found')
                }
              
    
    
            }catch(error){
    
            }
        }
        else{
            fetchdata()
        }
 

    }
    const handleavailable=async(e)=>{
        if(e.target.checked===true){
            const value='Available'
            setsearchvalue(value)
            const datatwo={value:value}
            try{
                const response=await api.post('/api/searchinputproperty',datatwo)
                const datares=response.data.data
                console.log(datares)
                checkedReftwo.current.checked=!checked
                if(datares.length>0 && datares!=='undefined'){
                    setdata(datares)
                   
                    seterrormessage('')
    
                }
                else{
                  
                    seterrormessage('Record not found')
                }
              
    
    
            }catch(error){
    
            }
        }
        else{
            fetchdata()
        }
 
 
    }
   
    const handleimages=(value)=>{
        setviewimage(true)
        setnewimage(value)
    }
    const handleclose=(value)=>{
        setviewimage(false)

    }
    const handleshowtenant=(value)=>{
        propertyid(value)
        showtenant('TD')
    }
    return(
        <div className="md:w-96 w-56 flex justify-center">
            <div>
                {viewimage &&
                    <div className='absolute md:w-550 w-64 bg-slate-300 rounded-xl'>
                        <div className='py-5 px-5'>
                        <div className='flex justify-end'>
                            <i onClick={handleclose} class="fa fa-times text-red-500 cursor-pointer" aria-hidden="true"></i>
                        </div>
                        <div className='flex md:w-550 w-56 flex-wrap gap-5  justify-center  '>
                        
                       {newimage.length>0 && newimage.map((items,index)=>(
                       <div className='w-1/3' >
                       
                        <img src={items} className='object-fit rounded-2xl' />

                        </div>
                        ))}
                        </div>
                        </div>
                    
                </div>

                }
            <div className=''>
              
                <div><i class="fa fa-search text-slate-300" aria-hidden="true"></i>Search By:</div>
                <div className='text-center text-red-500'>{errormessage}</div>
                <div className='flex gap-1'>
                   
                <span className='text-sm'>Available:</span>
                <input ref={checkedRefone} onChange={(e)=>handleavailable(e)} type='checkbox' className='w-6 h-6'/>
                <span className='text-sm'>Not Available:</span>
                <input ref={checkedReftwo}  onChange={(e)=>handlenotavailable(e)} type='checkbox' className='w-6 h-6'/>

                </div>
               
            </div>
            <div className='overflow-y-scroll h-567'>
            {data.length>0&&data.map((items,index)=>{
                const image=(JSON.parse(items.images_base64)||[])
               
                return(

        
                <div className="md:w-96 w-56 border border-dashed bg-slate-200 rounded-lg h-auto gap-5 flex flex-col md:flex-row px-3 py-5 mt-3 border-black">
                <div className="md:w-1/2 w-full">
                    {image.length>0 &&
                    <img onClick={()=>(handleimages(image))} src={image[0]} alt={'No image'} className='object-fit rounded-2xl' />
            }

                </div>
                <div className="md:w-1/2 w-full">
                    <div className='flex justify-end text-xs'>
                        #Property ID:{items.id}
                    </div>
                    <div className='text-sm'>
                   {items.property_address}
                    </div>
                    <div className='text-xs'>
                    <div><span className='text-green-900'>Rent fees:</span><span className='text-red-500 font-bold'>N{items.rent_fees}</span></div>
                    <div>
                    <span className='text-green-900'>Agent fees:</span><span className='text-red-500 font-bold'>N{items.agent_fees}</span>

                    </div>
                    <div>
                    <span className='text-green-900'>Agreement:</span><span className='text-red-500 font-bold'>N{items.agreement}</span>

                    </div>


                    </div>
                    <div>
                        <span className='text-lg text-green-600'>Total:</span><span className='text-lg font-bold text-green-900'>N{JSON.parse(items.rent_fees)+JSON.parse(items.agent_fees)+JSON.parse(items.agreement)}</span>
                    </div>
                    <div className='mt-2'>
                    <button onClick={()=>handleshowtenant(items.id)} className='bg-green-900 h-8 w-full text-center text-sm rounded-lg text-yellow-500'>
                           Available
                    </button>

                    </div>


                </div>

            </div>)})}
            {showloader&&<div className="flex justify-center"><Loader/></div>}
            

            </div>
            



            </div>
           
        </div>
    )
}
export default Displayproperty