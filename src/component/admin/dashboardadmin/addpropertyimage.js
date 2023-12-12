import { useState } from "react";
const Addimage=({showaddprops})=>{
   
const [images, setImages] = useState([]);
const handleback=()=>{
    showaddprops(true,false,false)
}


const handleDrop = (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);

  // Process each dropped file
  const newImages = files.map((file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // Get the base64 representation of the image
      const base64Image = event.target.result;
      setImages((prevImages) => [...prevImages, base64Image]);
    };

    // Read the image file as a data URL
    reader.readAsDataURL(file);

    return file;
  });

  // Update the state with the new images
  setImages((prevImages) => [...prevImages, ...newImages]);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const removeImage = (index) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};
    return(
        <div className="w-64 md:w-96">
        <div className="border border-black border-dashed rounded-2xl bg-slate-200 h-500 px-3  ">
        <div className="justify-center flex">
            <div className="bg-green-900 w-32 rounded-b-xl text-yellow-500 h-8 flex justify-center">
                <i class="fa fa-plus" aria-hidden="true"></i>Add Property
            </div>

            </div>
            <div className="text-right">#Property ID 020</div>
            <div>
           
    <div
      style={dropzoneStyles}
      onDrop={handleDrop}
      
      onDragOver={handleDragOver}
    >
      {images.length > 0 ? (
        <div>
          {images.map((image, index) => (
            <div key={index} style={imageContainerStyles}>
              <img src={image} alt={`Uploaded ${index}`} style={imageStyles} />
              <button onClick={() => removeImage(index)} className="bg-red-300 rounded-lg px-2">Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Drag 'n' drop images here, or click to select them</p>
      )}
    </div>

            </div>
            <div className="flex justify-between mt-3">
                        <button onClick={handleback} className="px-2 bg-green-900 text-white"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</button>
                        
                    </div>
            <div className="flex justify-center mt-3">
            <button className="bg-green-900 rounded-xl px-3 text-yellow-500">
                 Submit all data
            </button>

            </div>
           
            
            
         
       

        </div>

    </div>
    )
}
export default Addimage
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
