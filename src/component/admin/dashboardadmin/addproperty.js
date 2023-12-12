import { useState } from "react"
const Addproperty=({showform,clientname})=>{
    const [name,setname]=useState('Oluwasuyi Babayomi')
    const handlenext=()=>{
        showform(true,false,false)
        clientname(name)
    }
    return(
        <div className="w-64 md:w-96">
            <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-500 px-3 ">
                <div className="justify-center flex">
                <div className="bg-green-900 w-32 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                    <i class="fa fa-plus" aria-hidden="true"></i>Add Property
                </div>
             
                </div>
                <div className="text-xs text-center">
                   Search Client by Name or Client id
                </div>
                <div className='flex justify-center'>
                    <div>
                    <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                   <input className="md:w-72 w-52 h-8 outline-0 border rounded-2xl px-7"/>

                    </div>
                
            </div>
            <div className="h-400 overflow-y-scroll">
            <div className="bg-slate-300 mt-3">
                <div className="flex justify-between px-5 py-2">
                <div>Oluwasuyi Babayomi</div>
                <button onClick={handlenext} className="bg-green-900 text-yellow-500 w-32 rounded-2xl text-sm"><i class="fa fa-plus" aria-hidden="true"></i>Add Property</button>

                </div>
                
            </div>
            </div>
            

            </div>

        </div>

    )
}
export default Addproperty