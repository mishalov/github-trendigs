import React from "react";
import "./Loader.scss";

/**
 * Loader, use if you want user to wait something
 */
const Loader: React.FC = props => (
  <div className="loader__wrapper">
    <div className="loader">
      <div className="loader-article">
        <div className="loader-page" />
      </div>
      <div className="loader__caption">{props.children}</div>
    </div>
  </div>
);

export default Loader;
