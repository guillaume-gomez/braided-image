import React from 'react';

function InputImage() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="image">
        Choose an image:
      </label>
      <input 
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
      />

    </div>
  );
}

export default InputImage;
