import { useState } from "react"
import Allocateproperty from "./allocateproperty"

const Tenantproperty = ({propertyid}) => {
    
    return (
        <div>
          
           <Allocateproperty
           propertyid={propertyid}
            />
            
           
        </div>

    )
}
export default Tenantproperty