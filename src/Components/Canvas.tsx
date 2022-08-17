import React, { useState, useEffect, useRef } from 'react';

interface CanvasInterface {
  image1: HTMLImageElement;
  image2: HTMLImageElement;
}

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
      //drawBraid(context, image1, 40, 80, minHeight/2);
      //ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
    }
    //setWidth(minWidth);
    //setHeight(minHeight);
  }, [image1, image2]);

  function draw(context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) {
    context.clearRect(0,0, width, height);
    //console.log(image1.width)
    //console.log(image1.height)
    context.drawImage(image1,0,0, image1.width, image1.height, 0, 0, widthCanvas, heightCanvas);
    let x = 0;
    while(x < widthCanvas) {
      drawBraid(context, image2, x, heightCanvas);
      x += 80;

    }
    //drawBraidPart(context, image2, 50,60, 80,  60);
  }

  function drawBraid(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, height: number) {
    const braidSize = Math.floor(Math.random() * 100);
    let y = 0;
    const heightCross = 50;
    while(y < height) {
      drawBraidPart(context, image2, x, y, 40, heightCross);
      y += heightCross + 20;
    }
  }


  function drawBraidPart(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, widthBraid: number, heightBraid: number) {
    context.drawImage(image, x, y, widthBraid, heightBraid, x, y, widthBraid, heightBraid);
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x, y + heightBraid);
    context.stroke();
    context.moveTo(x + widthBraid,y);
    context.lineTo(x + widthBraid, y + heightBraid);
    context.stroke();
    //context.strokeRect(x-1, y, widthBraid, heightBraid-4);
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{border: "5px solid teal"}}/>
  );
}

export default Canvas;
