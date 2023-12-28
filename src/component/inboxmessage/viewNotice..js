import { useEffect, useState } from "react"
import api from "../api/api"

const ViewNotice=({shownotice,tenantID})=>{
    const [data,setdata]=useState([])
    // get notice file
    const fetchdata=async()=>{
        try{
            const response=await api.get(`/api/getnotice/${tenantID}`)
            const datares=response.data.data
            setdata(datares)




        }catch(error){
            console.error(error)
        }
       

    }
    useEffect(()=>{
        fetchdata()

    },[])
    function getMimeTypeFromDataURI(dataURI) {
        // Extract the part of the URI that contains the MIME type
        const mimeTypePart = dataURI.split(';')[0];
    
        // Extract the MIME type from the part
        const mimeType = mimeTypePart.split(':')[1];
    
        return mimeType;
    }
    const handledownload = (value) => {
        const base64 = value.split(',')[1];
        const mimeType = getMimeTypeFromDataURI(value); // Adjust the mime type accordingly
    
        // Decode the base64 string to binary data
        const binaryData = atob(base64);
    
        // Convert the binary data to an ArrayBuffer
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
    
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }
    
        // Create a Blob from the ArrayBuffer with the specified mime type
        const blob = new Blob([arrayBuffer], { type: mimeType });
    
        // Create a download link and trigger a download
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "filename"; // Adjust the filename (you might want to extract it from the data URI or use a default name)
        downloadLink.click();
    };
    const shownoticefunc=()=>{
        shownotice(false)

}    
    
    return(
        <div className="w-screen  h-screen   bg-white py-10 px-5">
            <div className="flex justify-end mb-5">
            <button  onClick={shownoticefunc} className=" bg-red-500 text-white px-3 rounded-xl"><i class="fa fa-times" aria-hidden="true"></i>Close</button>
            </div>

            {data.length>0 && data.map((item,index)=>(
                <div className="flex  gap-5 justify-center">
                <div>{item.description}</div> 
                <div><i class="fa fa-file fa-2xl text-green-900" aria-hidden="true"></i></div>
                <button onClick={()=>handledownload(item.notice_file)} className="bg-green-900 text-white px-4 rounded-2xl">Download file</button>
             </div>

            ))
            }


        </div>

    )
}
export default ViewNotice