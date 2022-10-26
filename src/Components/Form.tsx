import React, { useState, useRef } from 'react';
import InputRange from './InputRange';
import InputImage from "./InputImage";
import UploadImage from "./UploadImage";

interface FormProps {
  onSubmit : (image1: HTMLImageElement, image2: HTMLImageElement, padding: number) => void;
}

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;

type imageType = "image1" | "image2";

function Form({onSubmit} : FormProps) {
  const [image1, setImage1] = useState<HTMLImageElement|null>(null);
  const [image2, setImage2] = useState<HTMLImageElement|null>(null);
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [padding, setPadding] = useState<number>(4);

  function isFormValid() : boolean {
    return !!(image1 && image2);
  }

  function submit() {
    if(!isFormValid()) {
      return;
    }
    onSubmit(image1!, image2!, padding);
  }

  function resize(file: File, width: number, height:number, type: imageType) {
    const reader = new FileReader();
    reader.onload = function (e) {
        // store as image the file to be sent to the canvas
        const img = document.createElement("img");
        img.onload = function (event) {
            // Dynamically create a canvas element
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            // Change the resizing logic
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }
            }
            const ctx = canvas.getContext("2d");
            ctx!.imageSmoothingEnabled = true;
            // Actual resizing
            ctx!.drawImage(img, 0, 0, width, height);
            // Show resized image in preview element
            const dataUrl = canvas.toDataURL(file.type);
            resizedImageCallback(dataUrl, type);
        }
        if(e.target) {
          // in order to call the onload callback
          (img as any).src = e.target.result;
        }
    }
    reader.readAsDataURL(file);
  }

  function loadImage(event: React.ChangeEvent<HTMLInputElement>, type: imageType) {
    if(event && event.target && event.target.files) {
      const file = event.target.files[0];
      resize(file, width, height, type);
    }
  }

  function resizedImageCallback(dataUrl: string, type: imageType) {
    const image = new Image();
    image.onload = (event: any) => {
      if(type === "image1") {
        setImage1(image);
      } else {
        setImage2(image);
      }
    };
    image.src = dataUrl;
  }

  return (
    <div className="card w-96 bg-base-200 shadow-xl p-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Settings</h2>
        <UploadImage onChange={(event) =>loadImage(event, "image1")}/>
        <UploadImage onChange={(event) =>loadImage(event, "image2")}/>
        <InputRange value={width} label={"Width"} onChange={(value) => setWidth(value)} step={5} min={10} max={MAX_WIDTH} />
        <InputRange value={height} label={"Height"} onChange={(value) => setHeight(value)} step={5} min={10} max={MAX_HEIGHT} />
        <InputRange value={padding} label={"Padding"} onChange={(value) => setPadding(value)} step={1} min={2} max={100} />
      </div>
      <div className="card-actions">
        <button
          className="btn btn-primary"
          disabled={!isFormValid()}
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
