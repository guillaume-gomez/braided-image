import React, { useState, useRef } from 'react';
import './App.css';
import InputImage from "./Components/InputImage";
import Form from "./Components/Form";
import Canvas from "./Components/Canvas";


function App() {
  const [image1, setImage1] = useState<HTMLImageElement|null>(null);
  const [image2, setImage2] = useState<HTMLImageElement|null>(null);
  const [padding, setPadding] = useState<number>(2);

  function onSubmit(image1: HTMLImageElement, image2: HTMLImageElement, padding: number) {
    setImage1(image1);
    setImage2(image2);
    setPadding(padding);
  }

  return (
    <div className="">
    <Form onSubmit={onSubmit} />
    {
      image1 && image2 ? 
        <Canvas image1={image1} image2={image2} padding={padding} /> :
        <progress className="progress progress-accent w-56"></progress>
    }
    </div>
  );
}

export default App;
