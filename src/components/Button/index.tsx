import React from "react";
import "./Button.scss";

interface IButtonProps {
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = props => {
  const { onClick, children } = props;
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
