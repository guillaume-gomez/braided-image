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
      context.drawImage(image2,0,0, image1.width, image1.height,0,0, minWidth, minHeight);
      drawBraid(context, image1, 40, 80, minHeight/2);
      //ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
    }
    setWidth(minWidth);
    setHeight(minHeight);
  }, [image1, image2]);

  function drawBraid(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, widthBraid: number, minHeight: number) {
    const braidSize = Math.floor(Math.random() * 40);
    context.drawImage(image, 0, 0, image.width, image.height, x, 0, widthBraid, minHeight)
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{background: "teal"}}/>
  );
}

export default Canvas;
