import { useState, useRef,useEffect } from "react"
import api from "../api/api";
const Updateimage = ({getid}) => {
    const [images, setImages] = useState([]);
    const [errormessage, seterrormessage] = useState('');
    const fileInputRef = useRef(null);
    const fetchnyid=async()=>{
        try{
            const response=await api.get(`/api/selectpropertybyid/${getid}`)
            const datares=response.data.data
            setImages(JSON.parse(datares.images_base64))
            console.log(datares)
            

        }catch(error){
            console.error(error)

        }

    }
    useEffect(()=>{
        fetchnyid()

    },[])

    const handleButtonClick = () => {
        // Trigger the click event on the file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        // Handle the selected file(s)
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                // Get the base64 representation of the image
                const base64Image = event.target.result;
                setImages((prevImages) => [...prevImages, base64Image]);
            };

            // Read the image file as a data URL
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);

        droppedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                // Get the base64 representation of the image
                const base64Image = event.target.result;
                setImages((prevImages) => [...prevImages, base64Image]);
            };

            // Read the image file as a data URL
            reader.readAsDataURL(file);
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    const handlesubmit=async()=>{
        const data={images_base64:images}
        try{
            const response=await api.put(`/api/updateproperty/${getid}`,data)
            const datares=response.data.message
            if(datares==='Property updated successfully'){
              seterrormessage('Property updated successfully')
             

            }
            else{
              seterrormessage('Property Not Updated')
            }


          }catch(error){
            console.error(error)
          }
    }
    return (
        <div className="flex justify-center">
            <div className="h-400">
                <div className="text-red-500 text-center text-sm">{errormessage}</div>


                <div
                    style={dropzoneStyles}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >

                    <button className="bg-green-900 text-yellow-500 px-3" onClick={handleButtonClick}>Select Images</button>
                    {images.length > 0 ? (
                        <div>
                            {console.log(images)}
                            {images.map((image, index) => (
                                <div key={index} style={imageContainerStyles}>
                                    <img src={image
                                    } alt={`Uploaded ${index}`} style={imageStyles} />
                                    <button onClick={() => removeImage(index)} className="bg-red-300 rounded-lg px-2">Remove</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Drag 'n' drop images here, or click to select them</p>
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    multiple
                />
                  <div className="flex justify-center mt-3">
                        <button onClick={handlesubmit} className="px-2 bg-green-900 text-white"><i class="fa fa-refresh" aria-hidden="true"></i>Update Images</button>
                       
                    </div>

            </div>
          



        </div>

    )
}
export default Updateimage
const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

const imageContainerStyles = {
    position: 'relative',
    display: 'inline-block',
    margin: '5px',
};

const imageStyles = {
    maxWidth: '100%',
    maxHeight: '150px',
};