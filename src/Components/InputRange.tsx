import React, { useState, useRef } from 'react';

import InputImage from "./InputImage";

interface InputRangeProps {
  min: number;
  max: number;
  value: number;
  step: number;
  label: string;
  onChange: (value: number) => void;
}

function InputRange({min, max, value, step, label, onChange } : InputRangeProps) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="range range-primary"
      />
      <span>{label} : {value}</span>
     </div>
    );
}

export default InputRange;
