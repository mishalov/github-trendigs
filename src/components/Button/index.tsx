import React from "react";
import cn from "classnames";
import "./Button.scss";

interface IButtonProps {
  onClick?: () => void;
  status?: "disabled" | "success" | "normal";
}

/**
 * Ordinary button component
 */
const Button: React.FC<IButtonProps> = props => {
  const { onClick, children } = props;
  const status = props.status || "normal";
  return (
    <button className={cn("button", `button--${status}`)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
