import React from 'react';

interface UploadImageInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image?: HTMLImageElement
}

function UploadImage({onChange, image} : UploadImageInterface) {
  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-primary flex flex-row items-center gap-3 relative">
        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
        </svg>
        <span>Upload Document</span>
        <input
            className="absolute opacity-0 w-full h-full"
            type="file"
            accept="image/*"
            onChange={onChange}
        />
      </button>
      {
        image ?
          <img src={image.src}/>
          :
          <span>No preview</span>
      }
    </div>
  );
}

export default UploadImage;
