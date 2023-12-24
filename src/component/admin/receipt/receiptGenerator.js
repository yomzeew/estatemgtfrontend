import { useState } from "react"
import GenerateListtenant from "./selectcompletepayreceipt"

const ReceiptGenerator=()=>{
    const [showtenantrec,setshowtenantrec]=useState(false)
    const [showclientrec,setshowclientrec]=useState(false)
    const [showdefault,setshowdefault]=useState(true)
    return(
        <div className="md:w-750 w-72 flex justify-center">
            {showdefault &&<div className=" grid place-items-center grid-flow-col gap-10">
                <div onClick={()=>{setshowtenantrec(true);setshowdefault(false)}} className="text-center cursor-pointer">
                    <div><i className="fa fa-file fa-4x text-green-900"></i></div>
                    <div>Tenants Receipt</div>
                </div>
                <div className="text-center cursor-pointer">
                    <div><i className="fa fa-file fa-4x text-yellow-500"></i></div>
                    <div>Client Receipt</div>
                </div>

            </div>}
            {showtenantrec &&
            <div>
                <GenerateListtenant/>
            </div>
                }


        </div>

    )

}
export default ReceiptGenerator