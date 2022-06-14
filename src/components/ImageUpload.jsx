import React from "react";

import ImageUploading from "react-images-uploading";

import "../App.css";

function ImageUpload({removeImg}) {
    // console.log(typeof(removeImg));
    
  const [images, setImages] = React.useState([]);
  const [images2, setImages2] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
  
    setImages(imageList);
    setImages2(imageList[0].data_url)
 
  };


const [ViewBtn, setViewBtn] = React.useState("image-upload");
const HideBtn = () =>
{
    setViewBtn("hidden");
}

 localStorage.setItem("ImageUrl" , images2);

  return (
    <div className="ImageUpload" >
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
             type="button"
              {...dragProps}
            >
             <div className={ViewBtn}>
  <label htmlFor="file-input">
    <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"
    onClick={HideBtn}
    onDrop={HideBtn}
    alt="upload"
    style={{width:"100px"}}
    />
            <h5>Select Profile Pic</h5>
  </label>
                </div>
            </button>
            &nbsp;
          {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100"/>
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUpload;