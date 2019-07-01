import React from "react";
import { TRepo } from "github-trendings/types";
import star from "../../assets/svg/star_white.svg";
import "./RepoItem.scss";
import Button from "../Button";
import Tagline from "../Tagline";

interface IRepoItemProps {
  repoInfo: TRepo;
}

const RepoItem = (props: IRepoItemProps) => {
  const { repoInfo } = props;
  const {
    name,
    owner,
    htmlUrl,
    description,
    language,
    stargazersCount,
    forks
  } = repoInfo;
  const { login, avatarUrl } = owner;
  const ownerHtmlUrl = owner.htmlUrl;
  return (
    <article className="repo-item">
      <header className="repo-item__header">
        <h1 className="repo-item__title">
          <a href={ownerHtmlUrl} target="_blank" rel="noopener noreferrer">
            {login}
          </a>
          <span className="repo-item__title-divider">/</span>
          <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h1>
        <Button onClick={() => {}}>
          <div className="repo-item__star">
            <img alt="star" src={star} width="12" height="12" /> Star
          </div>
        </Button>
      </header>
      <p className="repo-item__description">{description}</p>
      <Tagline
        language={language}
        stargazersCount={stargazersCount}
        forks={forks}
      />
    </article>
  );
};

export default RepoItem;
