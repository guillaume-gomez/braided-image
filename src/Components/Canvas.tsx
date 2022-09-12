import React, { useState, useEffect, useRef } from 'react';

interface CanvasInterface {
  image1: HTMLImageElement;
  image2: HTMLImageElement;
}

const HOLE_SIZE = 4;

function Canvas({ image1, image2 }: CanvasInterface) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const minWidth = Math.min(image1.width, image2.width);
    const minHeight = Math.min(image1.height, image2.height);
    if(canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if(!context) {
        throw new Error("cannot find context 2d on the canvas component");
      }
      canvasRef.current.width = minWidth;
      canvasRef.current.height = minHeight;
      draw(context, image1.width, image1.height);
    }
  }, [image1, image2]);

  function draw(context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) {
    context.clearRect(0,0, width, height);
    
    const widthBraid = 50;
    const heightBraid = 50;
    const spacing = 50;
    let direction = 1;
    for(let x = 0; x < widthCanvas; x += (widthBraid)) {
      for(let y = 0; y <heightCanvas; y += (2*heightBraid)) {
        // drawCol
         if(direction === 1) {
          drawSquare(context, image1, x, y, widthBraid, heightBraid, widthBraid - HOLE_SIZE, heightBraid);
          drawSquare(context, image2, x, y + heightBraid, widthBraid, heightBraid, widthBraid, heightBraid - HOLE_SIZE);
         }
         else {
          drawSquare(context, image2, x , y, widthBraid, heightBraid, widthBraid, heightBraid - HOLE_SIZE);
          drawSquare(context, image1, x , y + heightBraid, widthBraid, heightBraid, widthBraid - HOLE_SIZE, heightBraid);
         }
      }
      direction *= -1;
    }
  }


  function drawSquare(
      context: CanvasRenderingContext2D,
      image: HTMLImageElement,
      x: number,
      y: number,
      widthViewport: number,
      heightViewport: number,
      widthBraid: number,
      heightBraid: number,
      
    ) {
    const middleHoleSizeX = (widthViewport - widthBraid) / 2;
    const middleHoleSizeY = (heightViewport - heightBraid) / 2;
    context.drawImage(image, x, y, widthViewport, heightViewport, x + middleHoleSizeX, y + middleHoleSizeY, widthBraid, heightBraid);
  }


  return (
    <canvas ref={canvasRef} width={width} height={height} style={{border: "5px solid teal"}}/>
  );
}

export default Canvas;
