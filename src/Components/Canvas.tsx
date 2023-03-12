import React, { useEffect, useRef } from 'react';
import { format as formatFns } from "date-fns";

// image1 and image2 has the same size
interface CanvasInterface {
  image1: HTMLImageElement;
  image2: HTMLImageElement;
  padding: number;
  wovenColor: string;
}

function Canvas({ image1, image2, padding, wovenColor }: CanvasInterface) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

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
  }, [image1, image2, padding, wovenColor]);

  function draw(context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) {
    context.clearRect(0,0, widthCanvas, heightCanvas);
    // set woven color
    context.rect(0, 0, widthCanvas, heightCanvas);
    context.fillStyle = wovenColor;
    context.fill();
    
    const widthBraid = 50;
    const heightBraid = 50;
    let direction = 1;
    for(let x = 0; x < widthCanvas; x += (widthBraid)) {
      for(let y = 0; y < heightCanvas; y += (2*heightBraid)) {
        // drawCol
         if(direction === 1) {
          drawSquare(context, image1, x, y, widthBraid, heightBraid, widthBraid - padding, heightBraid);
          //drawShadow(context, x, y, 2, heightBraid);
          //drawShadow(context, x + widthBraid - 5 ,y, 5, heightBraid);

          drawSquare(context, image2, x, y + heightBraid, widthBraid, heightBraid, widthBraid, heightBraid - padding);
          //drawShadow(context, x, y + heightBraid, widthBraid, 2);
          //drawShadow(context, x, y + heightBraid - 5, widthBraid, 5);
        }
         // drawRow
         else {
          drawSquare(context, image2, x , y, widthBraid, heightBraid, widthBraid, heightBraid - padding);
          drawSquare(context, image1, x , y + heightBraid, widthBraid, heightBraid, widthBraid - padding, heightBraid);
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

  function drawShadow(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    widthBraid: number,
    heightBraid: number,
  ) {
    /*
      TODO: has middleHole like drawSquare
    */
    //context.shadowColor = "red";
    context.shadowBlur = 15;

    context.fillStyle = "blue";
    context.fillRect(x,y, widthBraid, heightBraid);
  }

  function saveImage() {
    if(canvasRef.current && anchorRef.current) {
      const format = "jpeg";
      const dataURL = canvasRef.current.toDataURL(`image/${format}`);
      const dateString = formatFns(new Date(), "dd-MM-yyyy-hh-mm");
      (anchorRef.current as any).download = `${dateString}-image-in-images.${format}`;
      anchorRef.current.href = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
  }

  const paddingFrame = 20;
  return (
    <div
      className="flex flex-col gap-2 items-start"
        style={{
          width: image1.width + (paddingFrame * 6) + 32,
        }}
      >
      <div style={{
            border: `${paddingFrame * 2}px solid black`,
            width: image1.width + (paddingFrame * 6),
            height: image1.height + (paddingFrame * 6)
            }}
      >
        <div style={{
            border: `${paddingFrame}px solid white`,
            width: image1.width + (paddingFrame * 2),
            height: image1.height + (paddingFrame * 2)
            }}
          >
          <canvas ref={canvasRef} width={image1.width} height={image1.height} style={{background: "black"}}/>
        </div>
      </div>
      <a ref={anchorRef} className="btn btn-primary" onClick={ () => saveImage()}>
        Save as image 🖼️
      </a>
    </div>
  );
}

export default Canvas;
