import React, { useState, useRef } from 'react';
import './App.css';
import InputImage from "./Components/InputImage";
import Form from "./Components/Form";
import Canvas from "./Components/Canvas";


function App() {
  const [image1, setImage1] = useState<HTMLImageElement|null>(null);
  const [image2, setImage2] = useState<HTMLImageElement|null>(null);
  
  function onSubmit(image1: HTMLImageElement, image2: HTMLImageElement) {
    setImage1(image1);
    setImage2(image2);
  }

  return (
    <div className="">
    <Form onSubmit={onSubmit} />
    {
      image1 && image2 ? 
        <Canvas image1={image1} image2={image2} /> :
        <progress className="progress progress-accent w-56"></progress>
    }
    </div>
  );
}

export default App;
