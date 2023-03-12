import React, { useState, useEffect } from 'react';
import InputRange from './InputRange';
import UploadImage from "./UploadImage";
import InputColor from "./InputColor";

interface FormProps {
  onSubmit : (image1: HTMLImageElement, image2: HTMLImageElement, padding: number, wovenColor: string) => void;
}

const MAX_WIDTH = 1200 * 2;
const MAX_HEIGHT = 900 * 2;

type imageType = "image1" | "image2";

function Form({onSubmit} : FormProps) {
  const [image1, setImage1] = useState<HTMLImageElement>();
  const [image2, setImage2] = useState<HTMLImageElement>();
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [padding, setPadding] = useState<number>(4);
  const [wovenColor, setWovenColor] = useState<string>("#000000");

  useEffect(() => {
    if(image1 && image2) {
      const resizedImage1 = resizeImage(image1, width, height);
      const resizedImage2 = resizeImage(image2, width, height);

      setImage1(resizedImage1);
      setImage2(resizedImage2);
    }
  }, [width, height])

  function isFormValid() : boolean {
    return !!(image1 && image2);
  }

  function submit() {
    if(!isFormValid()) {
      return;
    }
    onSubmit(image1!, image2!, padding, wovenColor);
  }

  function resizeImage(image: HTMLImageElement, expectedWidth: number, expectedHeight: number) : HTMLImageElement {
      // Dynamically create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = expectedWidth;
      canvas.height = expectedHeight;

      // Change the resizing logic
      if (expectedWidth > expectedHeight) {
          if (expectedWidth > MAX_WIDTH) {
              expectedHeight = expectedHeight * (MAX_WIDTH / expectedWidth);
              expectedWidth = MAX_WIDTH;
          }
      } else {
          if (expectedHeight > MAX_HEIGHT) {
              expectedWidth = expectedWidth * (MAX_HEIGHT / expectedHeight);
              expectedHeight = MAX_HEIGHT;
          }
      }
      const ctx = canvas.getContext("2d");
      ctx!.imageSmoothingEnabled = true;
      // Actual resizing
      ctx!.drawImage(image, 0, 0, expectedWidth, expectedHeight);

      // Show resized image in preview element
      const resizedImage = new Image();
      resizedImage.onload = () => {};
      resizedImage.src = canvas.toDataURL();

      return resizedImage;
  }

  function loadImage(image: HTMLImageElement, type: imageType) {
    const resizedImage = resizeImage(image, width, height);
    resizedImageCallback(resizedImage, type);
  }

  function resizedImageCallback(image: HTMLImageElement, type: imageType) {
    if(type === "image1") {
      setImage1(image);
    } else {
      setImage2(image);
    }
  }

  return (
    <>
      <UploadImage image={image1} onChange={(image) =>loadImage(image, "image1")}/>
      <UploadImage image={image2} onChange={(image) =>loadImage(image, "image2")}/>
      <InputRange value={width} label={"Width"} onChange={(value) => setWidth(value)} step={5} min={10} max={MAX_WIDTH} />
      <InputRange value={height} label={"Height"} onChange={(value) => setHeight(value)} step={5} min={10} max={MAX_HEIGHT} />
      <InputRange value={padding} label={"Padding"} onChange={(value) => setPadding(value)} step={1} min={2} max={100} />
      <InputColor value={wovenColor} label={"Woven Color"} onChange={(value) => setWovenColor(value)} />
      <button
        className="btn btn-lg btn-accent"
        disabled={!isFormValid()}
        onClick={submit}
      >
        Generate 🚀
      </button>
    </>
  );
}

export default Form;
