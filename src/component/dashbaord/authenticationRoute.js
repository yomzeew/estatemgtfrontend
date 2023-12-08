import { useState } from "react"
import { Route } from "react-router-dom"
import api from '../api/api'
import { useEffect } from "react"
import Error404 from "../error/error404"
import Dashbaordtenant from "./dashbaordtenant"


const Authentication=()=>{
    const [authcheck,setauthcheck]=useState(false)
    const auth=localStorage.getItem('myvalue')
    const handlefetch=async()=>{

        if(auth){
            const data={value:auth}
            try{
                const response=await api.post('/api/selectuser',data)
                const check=response.data.message
                if(check===true){
                    authcheck(true)
                }
                else{
                    authcheck(false)
                }
    
            }
            catch(error){
                console.error(error)
            }

        }

    
        

    }
    useEffect(()=>{


    },[])
    return(
        
        <Route exact path={authcheck?'/dashbaordtenant':'/errorpage'} element={authcheck?<Dashbaordtenant/>:<Error404/>} />

    )
}
export default Authentication