import React from 'react';

interface InputImageInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputImage({ onChange }: InputImageInterface) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <label htmlFor="image">
        Choose an image:
      </label>
      <input type='file' accept="image/*" onChange={onChange} />
    </div>
  );
}

export default InputImage;
