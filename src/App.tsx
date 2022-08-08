import React, { useState, useRef } from 'react';
import './App.css';
import InputImage from "./Components/InputImage";
import Canvas from "./Components/Canvas";

type imageType = "image1" | "image2";

function App() {
  const [image1, setImage1] = useState<HTMLImageElement|null>(null);
  const [image2, setImage2] = useState<HTMLImageElement|null>(null);
  const refResizedImage = useRef<HTMLImageElement>(null);

  function resize(file: File, width: number, height:number) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement("img");
        img.onload = function (event) {
            if(!refResizedImage  || !refResizedImage.current) {
              return;
            }
            // Dynamically create a canvas element
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            // Change the resizing logic
/*            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }
            }*/

            // var canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            ctx!.imageSmoothingEnabled = true;

            // Actual resizing
            ctx!.drawImage(img, 0, 0, width, height);

            // Show resized image in preview element
            var dataurl = canvas.toDataURL(file.type);
            refResizedImage.current.src = dataurl;
        }
        if(e.target) {
          (img as any).src = e.target.result;
        }
    }
    reader.readAsDataURL(file);
  }

  function loadImage(event: React.ChangeEvent<HTMLInputElement>, type: imageType) {
/*    if(event && event.target && event.target.files) {
      const file = event.target.files[0];
      resize(file, 400,500)
    }*/
    if(event && event.target && event.target.files) {
      const image = new Image();
      image.onload = (event: any) => {
        console.log(type)
        if(type === "image1") {
          setImage1(image);
        } else {
          setImage2(image);
        }
      };
      const file = event.target.files[0];
      console.log(file)
      image.src = URL.createObjectURL(file);
    }
  }

  return (
    <div className="">
    <InputImage onChange={(event) =>loadImage(event, "image1")}/>
    <InputImage onChange={(event) =>loadImage(event, "image2")}/>
    <img id="preview" ref={refResizedImage}></img>
    {
      image1 && image2 ? 
        <Canvas image1={image1} image2={image2} /> :
        <progress className="progress progress-accent w-56"></progress>
    }
    </div>
  );
}

export default App;
