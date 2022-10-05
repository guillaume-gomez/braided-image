import React from 'react';

interface UploadImageInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadImage({onChange} : UploadImageInterface) {
  return (
    <div className="overflow-hidden relative mt-4 mb-4">
      <button className="btn btn-primary flex flex-row items-center gap-3">
          <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          <span>Upload Document</span>
          <input
              className="opacity-0 absolute w-full h-full"
              type="file"
              accept="image/*"
              onChange={onChange}
          />
        </button>
    </div>
  );
}

export default UploadImage;
