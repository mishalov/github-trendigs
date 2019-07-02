import React from "react";
import "./app.scss";
import { TRepo, TOwner } from "github-trendings/types";
import { objectKeysToCamelCase } from "./utils/toCamelCase";
import RepoItem from "./components/RepoItem";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import { withRouter, RouteComponentProps } from "react-router";
require("es6-promise").polyfill();
require("isomorphic-fetch");

class Repo implements TRepo {
  public id: number;
  public name: string;
  public fullName: string;
  public htmlUrl: string;
  public description: string;
  public language: string | null;
  public stargazersCount: number;
  public owner: TOwner;
  public forks: number;
  [name: string]: number | string | TOwner | null;

  constructor(param: any) {
    /*
      checking if param fields have no undefined value;
      null value is availabe for language field
    */
    Object.keys(this).forEach((key: string) => {
      if (param[key] === undefined) {
        throw new Error(
          `Parameter of Repo class constructor has no ${key} field value`
        );
      }
    });

    this.id = param.id;
    this.name = param.name;
    this.fullName = param.fullName;
    this.htmlUrl = param.htmlUrl;
    this.description = param.description;
    this.language = param.language;
    this.stargazersCount = param.stargazersCount;
    this.owner = param.owner;
    this.forks = param.forks;
  }
}

class Owner implements TOwner {
  public login: string;
  public avatarUrl: string;
  public htmlUrl: string;
  constructor(param: any) {
    /*
      checking if param fields have no undefined value;
      null value is availabe for language field
    */
    Object.keys(this).forEach((key: string) => {
      if (param[key] === undefined) {
        throw new Error(
          `Parameter of Repo class constructor has no ${key} field value`
        );
      }
    });
    this.login = param.login;
    this.avatarUrl = param.name;
    this.htmlUrl = param.htmlUrl;
  }
}

interface IAppProps extends RouteComponentProps {}

interface IAppState {
  repos: TRepo[];
  loading: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    repos: [],
    loading: true
  };

  componentDidMount() {
    this.updateRepoList();
  }

  componentDidUpdate(prevProps: IAppProps) {
    const { props } = this;
    if (props.match.params && (props.match.params as any).page) {
      const prevPage =
        prevProps.match.params && (prevProps.match.params as any).page;
      const page = (props.match.params as any).page;
      if (prevPage !== page) this.updateRepoList();
    }
  }

  updateRepoList = async () => {
    this.setState({ loading: true });
    const response = await this.fetchRepos();
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

  fetchRepos = async () => {
    const { match } = this.props;
    const page = Number(match.params ? (match.params as any).page! : 1);
    const rawResponse = await fetch(
      `https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc?page=${page}&per_page=10`
    );
    if (rawResponse.status > 300) {
      alert(
        "Network error! Possible situation : Github query limit was exceeded (10 per minute)"
      );
    }
    return JSON.parse(await rawResponse.text());
  };

  render() {
    const { repos, loading } = this.state;
    const { match } = this.props;
    const page = Number(match.params ? (match.params as any).page! : 1);
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
                  <RepoItem repoInfo={repo} key={`repo-item-${repo.id}`} />
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
