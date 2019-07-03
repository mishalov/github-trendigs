import React from "react";
import cn from "classnames";
import "./Label.scss";

export default (props: React.HTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={cn("input-label", props.className)}>
    {props.children}
  </label>
);
