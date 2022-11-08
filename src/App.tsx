import React, { useState, useRef } from 'react';
import './App.css';
import InputImage from "./Components/InputImage";
import Form from "./Components/Form";
import Canvas from "./Components/Canvas";
import Drawer from "./Components/Drawer";
import Footer from "./Components/Footer";

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
    <div className="flex flex-col h-screen justify-between">
      <Drawer/>
      <div className="mb-auto flex sm:flex-row flex-col items-center justify-between p-2 gap-3">
        <Form onSubmit={onSubmit} />
        <div className="card bg-base-200 shadow-xl h-full w-full">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Result</h2>
            {
              image1 && image2 ?
              <Canvas image1={image1} image2={image2} padding={padding} /> :
              <progress className="progress progress-accent w-56"></progress>
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
