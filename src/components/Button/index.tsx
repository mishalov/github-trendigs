import React from "react";
import cn from "classnames";
import "./Button.scss";

interface IButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = props => {
  const { onClick, children, disabled } = props;
  return (
    <button
      className={cn("button", { "button--disabled": disabled })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
