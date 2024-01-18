import { useState,useRef } from "react";
import api from "../../api/api";
const Addimageproperty=({getid})=>{
   
const [images, setImages] = useState([]);
const [errormessage,seterrormessage]=useState('');
const fileInputRef = useRef(null);

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
const submitdata=async()=>{
  const imagestring=JSON.stringify(images)
  const data=JSON.parse(localStorage.getItem('data'))
  const newdata={
                 images_base64:imagestring
                } 
                try{
                    const response=await api.put(`/api/updatepropertyprop/${getid}`,data)
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
    return(
        <div className="w-64 md:w-96">
        <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-500 px-3  ">
        <div className="justify-center flex">
            <div className="bg-green-900 w-32 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                <i class="fa fa-plus" aria-hidden="true"></i>Add Property
            </div>

            </div>
            <div className="text-right">#Client ID {getid}</div>
            <div className="text-center text-green-600 text-lg">{errormessage}</div>
            <div className="h-400 overflow-y-scroll">
              <div className="text-xs text-center">Images Not more than 20kb</div>

           
    <div
      style={dropzoneStyles}
      onDrop={handleDrop}  
      onDragOver={handleDragOver}
    >
      
    <button className="bg-green-900 text-yellow-500 px-3"   onClick={handleButtonClick}>Select Images</button>
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

            </div>
            
            <div className="flex justify-center mt-3">
            <button onClick={submitdata} className="bg-green-900 rounded-xl px-3 text-yellow-500">
                 Submit all data
            </button>

            </div>
           
            
            
         
       

        </div>

    </div>
    )
}
export default Addimageproperty
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
