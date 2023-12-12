import { useState } from "react"
import Addproperty from "./addproperty"
import Addpropertyform from "./addpropertyform"
import Addimage from "./addpropertyimage"

const Addform=()=>{
    const [showaddprops,setshowaddprops]=useState(true)
    const [showform,setshowform]=useState(false)
    const [showaddimage,setshowaddimage]=useState(false)
    const [name,setname]=useState('')
 
    const handlefunction=(form,props,add)=>{
        setshowform(form)
        setshowaddprops(props)
        setshowaddimage(add)

    }
    const getclientname=(value)=>{
        setname(value)
    }

    return(
        <div>
            {showaddprops &&
            <Addproperty
             showform={(form,props,add)=>handlefunction(form,props,add)}
             clientname={(value)=>getclientname(value)}
             
            />}
           {showform &&
           <Addpropertyform
            showaddprops={(form,props,add)=>handlefunction(form,props,add)}
            showaddimage={(form,props,add)=>handlefunction(form,props,add)}
            getname={name}
           />}
            {showaddimage &&
            <Addimage
            showaddprops={(form,props,add)=>handlefunction(form,props,add)}
           
            /> }
        </div>
    )
}
export default Addform