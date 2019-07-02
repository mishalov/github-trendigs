import React from "react";
import "./app.scss";
import { TRepo } from "github-trendings/types";
import { objectKeysToCamelCase } from "./utils/toCamelCase";
import RepoItem from "./components/RepoItem";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import { withRouter, RouteComponentProps } from "react-router";
import dayjs from "dayjs";
import { Repo } from "./class/Repo";
import { Owner } from "./class/Owner";
require("es6-promise").polyfill();
require("isomorphic-fetch");

interface IAppProps extends RouteComponentProps {}

interface IAppState {
  repos: TRepo[];
  loading: boolean;
  stars: number[];
}

class App extends React.Component<IAppProps, IAppState> {
  state: IAppState = {
    repos: [],
    loading: true,
    stars: []
  };

  public get currentPage(): number {
    const { match } = this.props;
    const page = Number(
      match && match.params ? (match.params as any).page! : 1
    );
    return page;
  }

  public componentDidMount() {
    const stars = localStorage.getItem("stars");
    if (stars) {
      this.setState({ stars: JSON.parse(stars) });
    }
    this.updateRepoList(this.currentPage);
    this.props.history.listen(location => {
      const rawPathname = location.pathname;
      const rawPageNumber = rawPathname !== "/" ? rawPathname[1] : 0;
      const page = !isNaN(rawPageNumber as number) ? Number(rawPageNumber) : 0;
      this.updateRepoList(page);
    });
  }

  public updateRepoList = async (page: number) => {
    this.setState({ loading: true });
    const response = await this.fetchRepos(page);
    const body = objectKeysToCamelCase(response);
    if (!body.items || !Array.isArray(body.items)) {
      alert("Recieved data structure was not corrent!");
      return;
    }
    const repos = body.items.map((repo: any) => {
      const normalizedRepo = new Repo(repo);
      const normalizedOwner = new Owner(normalizedRepo.owner);
      normalizedRepo.owner = normalizedOwner;
      return normalizedRepo;
    });
    this.setState({ repos, loading: false });
  };

  public fetchRepos = async (page: number) => {
    const dateWeekAgo = dayjs(new Date())
      .subtract(1, "week")
      .format("YYYY-MM-DD");
    const rawResponse = await fetch(
      `https://api.github.com/search/repositories?q=created:>${dateWeekAgo}&sort=stars&order=desc&page=${page}&per_page=10`
    );
    if (rawResponse.status > 300) {
      alert(
        "Network error! Possible situation : Github query limit was exceeded (10 per minute)"
      );
    }
    return JSON.parse(await rawResponse.text());
  };

  public makeStar = (repoId: number) => {
    const { stars } = this.state;
    let newStars = [...stars];
    const indexNow = stars.indexOf(repoId);
    if (indexNow !== -1) {
      newStars = newStars.filter(starredId => starredId !== repoId);
    } else {
      newStars.push(repoId);
    }
    this.setState({ stars: newStars });
    localStorage.setItem("stars", JSON.stringify(stars));
  };

  public render() {
    const { repos, loading, stars } = this.state;
    const page = this.currentPage;
    return (
      <div className="app">
        <section className="repos-list">
          <header className="repos-list__header">
            <h1 className="repos-list__title">
              List of trending repositories in GitHub
            </h1>
          </header>
          <div className="repos-list__content">
            {loading ? (
              <Loader>Loading...</Loader>
            ) : (
              <>
                {repos.map((repo: TRepo) => (
                  <RepoItem
                    repoInfo={repo}
                    key={`repo-item-${repo.id}`}
                    starThis={this.makeStar}
                    starred={stars.indexOf(repo.id) !== -1}
                  />
                ))}
                <Pagination pageNow={page} />
              </>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
