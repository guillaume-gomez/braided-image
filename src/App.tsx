import React, { useState } from 'react';
import './App.css';
import InputImage from "./Components/InputImage";
import Canvas from "./Components/Canvas";

type imageType = "image1" | "image2";

function App() {
  const [image1, setImage1] = useState<HTMLImageElement|null>(null);
  const [image2, setImage2] = useState<HTMLImageElement|null>(null);

  function loadImage(event: React.ChangeEvent<HTMLInputElement>, type: imageType) {
    if(event && event.target && event.target.files) {
      const image = new Image();
      image.onload = (event: any) => {
        if(type === "image1") {
          setImage1(image);
        } else {
          setImage2(image);
        }
      };
      image.src = URL.createObjectURL(event.target.files[0]);
    }
  }

  return (
    <div className="">
    <InputImage onChange={(event) =>loadImage(event, "image1")}/>
    <InputImage onChange={(event) =>loadImage(event, "image2")}/>
    {
      image1 && image2 ? 
        <Canvas image1={image1} image2={image2} /> :
        <progress className="progress progress-accent w-56"></progress>
    }
    </div>
  );
}

export default App;
