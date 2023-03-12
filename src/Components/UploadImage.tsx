import React, { useState, useEffect } from 'react';

interface UploadImageInterface {
  onChange: (newImage: HTMLImageElement) => void;
  image?: HTMLImageElement
}

function UploadImage({onChange, image} : UploadImageInterface) {
  const [blackAndWhite, setBlackAndWhite] = useState<boolean>(false);
  const [bufferImage, setBufferImage] = useState<HTMLImageElement>();

  useEffect(() => {
    if(blackAndWhite) {
      const blackAndWhiteImage = toBlackAndWhite();
      if(blackAndWhiteImage) {
        onChange(blackAndWhiteImage);
      }
    } else {
      if(bufferImage) {
        onChange(bufferImage);
      }
    }
  }, [blackAndWhite])

  function convertToGrayScale(context: CanvasRenderingContext2D, width: number, height: number) {
    const imageData = context.getImageData(0, 0, width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
     const red = imageData.data[i];
     const green = imageData.data[i + 1];
     const blue = imageData.data[i + 2];
     // use gimp algorithm to generate prosper grayscale
     const gray = (red * 0.3 + green * 0.59 + blue * 0.11);

     imageData.data[i] = gray;
     imageData.data[i + 1] = gray;
     imageData.data[i + 2] = gray;
     imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }


  function toBlackAndWhite() : HTMLImageElement | undefined {
    if(bufferImage) {
      const canvas =  document.createElement("canvas");
      canvas.width = bufferImage.width;
      canvas.height = bufferImage.height;

      const context = canvas.getContext("2d");
      if(!context) {
        return;
      }
      context.drawImage(bufferImage, 0,0, bufferImage.width, bufferImage.height);
      // mutate context
      convertToGrayScale(context, bufferImage.width, bufferImage.height);
      const newBlackAndWhiteImage = new Image();
      newBlackAndWhiteImage.onload = () => {};
      newBlackAndWhiteImage.src = canvas.toDataURL();
      return newBlackAndWhiteImage;
    }
  }

  function onChangeHandler(event:  React.ChangeEvent<HTMLInputElement>) {
    if(event && event.target && event.target.files) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload =  (event: any) => {
        onChange(image);
        setBufferImage(image);
      };
    }
  }


  return (
    <div className="flex flex-col gap-2 card bg-base-300 p-3">
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
            onChange={onChangeHandler}
        />
      </button>
      {
        image ?
          <img src={image.src} alt="preview image"/>
          :
          <span>No preview</span>
      }
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Black & White</span>
          <input type="checkbox" className="toggle" checked={blackAndWhite} onClick={() => setBlackAndWhite(!blackAndWhite) } />
        </label>
      </div>
    </div>
  );
}

export default UploadImage;
