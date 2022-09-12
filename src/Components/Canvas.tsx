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
      //drawBraid(context, image1, 40, 80, minHeight/2);
      //ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
    }
    //setWidth(minWidth);
    //setHeight(minHeight);
  }, [image1, image2]);

  // TODO
  // partir d'un image vide
  // faire deux boucles
  // donc une qui fait je rends une ligne (deja fait)
  // et l'autre qui rend une colone(a faire)

  function draw(context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) {
    context.clearRect(0,0, width, height);
    //context.drawImage(image1,0,0, image1.width, image1.height, 0, 0, widthCanvas, heightCanvas);
    const widthBraid = 50;
    const heightBraid = 50;
    const spacing = 50;
    let direction = 1;
    for(let x = 0; x < widthCanvas; x += (widthBraid)) {
      for(let y = 0; y <heightCanvas; y += (2*heightBraid)) {
        // drawCol
         if(direction === 1) {
           drawSquare(context, image1, x, y, widthBraid, heightBraid);
           drawSquare(context, image2, x, y + heightBraid, widthBraid, heightBraid);
         }
         else {
           drawSquare(context, image2, x , y, widthBraid, heightBraid);
           drawSquare(context, image1, x , y + heightBraid, widthBraid, heightBraid);
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
      widthBraid: number,
      heightBraid: number,
      
    ) {
    context.drawImage(image, x, y, widthBraid, heightBraid, x, y, widthBraid, heightBraid);
    
    // draw line to mimic shadows
    context.lineWidth = 2;
/*    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + heightBraid);
    context.moveTo(x + widthBraid, y);
    context.lineTo(x + widthBraid, y + heightBraid);
    context.stroke();*/

    //draw hole between the braids
/*    context.rect(x, y, HOLE_SIZE, HOLE_SIZE);
    context.rect(x + widthBraid - HOLE_SIZE, y, HOLE_SIZE, HOLE_SIZE);
    context.rect(x, y + heightBraid - HOLE_SIZE, HOLE_SIZE, HOLE_SIZE);
    context.rect(x + widthBraid - HOLE_SIZE, y + heightBraid - HOLE_SIZE, HOLE_SIZE, HOLE_SIZE);
    context.fill();*/

    context.strokeRect(x - 1,y -1, widthBraid, heightBraid);

  }


  return (
    <canvas ref={canvasRef} width={width} height={height} style={{border: "5px solid teal"}}/>
  );
}

export default Canvas;
