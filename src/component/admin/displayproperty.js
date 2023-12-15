import { useEffect, useState } from 'react'
import api from '../api/api'
import RealEstate from './image/Real-Estate-2.jpg'

const Displayproperty=({showtenant,propertyid})=>{
    const[data,setdata]=useState([])
    const [newimage,setnewimage]=useState([])
    const [viewimage,setviewimage]=useState(false)
    const fetchdata=async()=>{
        try{
            const response=await api.get('/api/selectproperty')
            const datares=response.data.data
            setdata(datares)


        }catch(error){

        }
      

    }
    useEffect(()=>{
        fetchdata()

    },[])
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
                <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                <input className="md:w-96 w-56 h-8 outline-0 border rounded-2xl px-7"/>
            </div>
            <div className='overflow-y-scroll h-567'>
            {data.length>0&&data.map((items,index)=>{
                const image=(JSON.parse(items.images_base64))
               
                return(

        
                <div className="md:w-96 w-56 border border-dashed bg-slate-200 rounded-lg h-auto gap-5 flex flex-col md:flex-row px-3 py-5 mt-3 border-black">
                <div className="md:w-1/2 w-full">
                    
                    <img onClick={()=>(handleimages(image))} src={image[0]} className='object-fit rounded-2xl' />

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
            

            </div>
            



            </div>
           
        </div>
    )
}
export default Displayproperty