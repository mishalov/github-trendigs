import React from "react";
import starBlack from "../../assets/svg/star_black.svg";
import fork from "../../assets/svg/fork.svg";
import "./Tagline.scss";
import { divideNumbers } from "../../utils/divideNumbers";

interface ITaglineProps {
  language: string | null;
  stargazersCount: number;
  forks: number;
}

/**
 * Component to show meta info of repository in Repo list
 */
const Tagline: React.FC<ITaglineProps> = props => {
  const { language, stargazersCount, forks } = props;
  return (
    <div className="tagline">
      {language && (
        <div
          className="tagline__item"
          title="Programming language / technologies"
        >
          {language}
        </div>
      )}
      <div
        className="tagline__item tagline__stargazers"
        title="Total stargazers"
      >
        <img src={starBlack} width="12" height="12" alt="star" />
        {divideNumbers(stargazersCount)}
      </div>
      <div className="tagline__item" title="Forks">
        <img src={fork} width="12" height="12" alt="forks" />
        {divideNumbers(forks)}
      </div>
    </div>
  );
};

export default Tagline;
