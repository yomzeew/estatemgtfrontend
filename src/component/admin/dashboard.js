import { useState } from "react"
import Addform from "./addform";
import Displayproperty from "./displayproperty";
import DisplayPropertyRec from "./displaypropertyrecord";
import Tenantproperty from "./addpropertytenant";


const Dashboardadmin=()=>{
    const[width,setwidth]=useState('w-16');
    const [position, setposition]=useState('left-10')
    const [icon,seticon]=useState('fa-arrow-circle-right')
    const [bool,setbool]=useState(true)
    const [showcomponent,setshowcomponent]=useState('D')
    const [propertyid,setpropertyid]=useState('')
    const showonlyicon=()=>{
        if(bool){
            setwidth('w-56')
            setposition('left-48')
            seticon('fa-arrow-circle-left')
            setbool(false)


        }
        else{
            setwidth('w-16')
            setposition('left-10')
            seticon('fa-arrow-circle-right')
            setbool(true)

        }
        
       

    }
    const handleshowcomp=(comp)=>{
        setshowcomponent(comp)

    }
    const handlegetid=(value)=>{
        setpropertyid(value)
    }

    return(
        <div >
            <div className="bg-slate-200 h-12 py-3 px-5 md:text-sm text-xs absolute top-0 w-screen z-50">
                <div className="flex justify-between">
                    <div className="md:w-3/4"><button onClick={()=>handleshowcomp('D')}><i class="fa fa-home" aria-hidden="true"></i>Home</button></div>
                    <div className="flex justify-between md:w-1/4">
                        <button onClick={()=>handleshowcomp('P')} className="bg-green-900 text-yellow-500 rounded-lg h-6 px-5"><i class="fa fa-plus" aria-hidden="true"></i>Add Property</button>
                        <div className="text-green-900">Hi Seun</div>
                    </div>
                </div>

            </div>
            <div>
                <div>
                    <div className={`${width} absolute left-0 h-full bg-green-900 z-30`}>
                        <div className="mt-20 flex justify-center">
                            <div>
                            <div ><i class={!bool?"fa text-yellow-500 fa-user-circle-o":"fa fa-2x text-yellow-500 fa-user-circle-o"} aria-hidden="true"></i> <span className="text-white">{!bool?'Client Record':''}</span> </div> 
                            <div className="mt-3"><i class={!bool?"fa text-yellow-500 fa-user":"fa fa-2x text-yellow-500 fa-user"} aria-hidden="true"></i> <span className="text-white">{!bool?'Tenant Record':''}</span> </div> 
                            <div onClick={()=>handleshowcomp('DP')} className="mt-3 cursor-pointer"><i class={!bool?"fa text-yellow-500 fa-list":"fa fa-2x text-yellow-500 fa-list"} aria-hidden="true"></i> <span className="text-white">{!bool?'Property Record':''}</span> </div> 
                            <div className="mt-3"><i class={!bool?"fa text-yellow-500  fa-file-o":"fa fa-2x text-yellow-500 fa-file-o"} aria-hidden="true"></i> <span className="text-white">{!bool?'Generate Invoice/Receipt':''}</span> </div> 
                            <div className="mt-3"><i class={!bool?"fa text-yellow-500 fa-balance-scale":"fa fa-2x text-yellow-500 fa-balance-scale"} aria-hidden="true"></i><span className="text-white">{!bool?'Account Section':''}</span> </div> 
                            </div>
                           
                           
                        </div>

                    
                        
                        
                    </div>
                    <div className={`absolute ${position} h-full flex items-center z-50`}>
                        <i onClick={showonlyicon} class={`fa fa-2x ${icon} text-yellow-500 cursor-pointer`} aria-hidden="true"></i>
                        


                    </div>
                    
                   
                    <div className="w-screen h-screen flex justify-center pt-16">
                       {showcomponent==='D' && 
                       <Displayproperty
                       showtenant={(value)=>handleshowcomp(value)}
                       propertyid={(value)=>handlegetid(value)}
                       />}
                       {showcomponent==='P' &&<Addform/>}
                       {showcomponent==='DP'&& <DisplayPropertyRec/>}
                       {showcomponent==='TD'&&<Tenantproperty 
                       propertyid={propertyid}
                       />}
                   
                   
                       

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Dashboardadmin