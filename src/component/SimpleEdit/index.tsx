import React from "react";

export enum EditType {
  Number,
  String,
  Address,
}

interface SimpleEditProps {
  placeholder?: string;
  type?: EditType;
  reference?: any;
  style?: object;
  value?: any;
}

const SimpleButton: React.FC<SimpleEditProps> = ({
  placeholder,
  type,
  reference,
  style,
  value,
}) => {
  let inputType = "text";
  if (type === EditType.Number) inputType = "number";
  return (
    <input
      style={style}
      ref={reference}
      type={inputType}
      defaultValue={value}
      className="simple-edit"
      placeholder={placeholder || "-"}
    />
  );
};

export default SimpleButton;
