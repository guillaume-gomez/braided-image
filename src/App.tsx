import React, { useState, useRef } from 'react';
import './App.css';
import Form from "./Components/Form";
import Canvas from "./Components/Canvas";
import Drawer from "./Components/Drawer";
import Card from "./Components/Card";
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
    <div  className="flex flex-col gap-7 bg-base-100">
      <Drawer/>
      <div className="p-5 flex md:flex-row flex-col flex-grow gap-5">
        <Card title="Settings" basisClass="md:basis-1/4 basis-2/5">
          <Form onSubmit={onSubmit} />
        </Card>
        <Card title="Result" basisClass="md:basis-3/4 basis-3/5">
          {

            image1 && image2 ?
            <div>
              <Canvas image1={image1} image2={image2} padding={padding} />
            </div> :
            <div>
              <p>Nothing to render yet</p>
              <progress className="progress progress-accent"></progress>
            </div>
          }
        </Card>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
