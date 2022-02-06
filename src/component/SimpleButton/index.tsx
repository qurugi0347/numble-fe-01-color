import React, { MouseEventHandler } from "react";

interface SimpleButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | String;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  handleClick,
  children,
}) => {
  return (
    <button className="simple-button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default SimpleButton;
