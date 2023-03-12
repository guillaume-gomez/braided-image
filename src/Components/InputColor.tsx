import React from 'react';

interface InputRangeProps {
  value: string;
  label: string;
  onChange: (value: string) => void;
}

function InputColor({value, label, onChange } : InputRangeProps) {
  return (
    <div className="flex flex-col gap-2 card bg-base-300 p-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="color"
      />
      <span>{label} : {value}</span>
     </div>
    );
}

export default InputColor;
