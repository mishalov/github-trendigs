import React from "react";
import "./app.scss";
import { TRepo, TOwner } from "github-trendings/types";
import { objectKeysToCamelCase } from "./utils/toCamelCase";
import RepoItem from "./components/RepoItem";
import Loader from "./components/Loader";
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

interface IAppProps {}

interface IAppState {
  repos: TRepo[];
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    repos: [],
    filter: {
      language: "",
      starred: ""
    }
  };

  async componentDidMount() {
    const response = await this.fetchRepos();
    const body = objectKeysToCamelCase(response);
    const repos = body.items.map((repo: any) => {
      const normalizedRepo = new Repo(repo);
      const normalizedOwner = new Owner(normalizedRepo.owner);
      normalizedRepo.owner = normalizedOwner;
      return normalizedRepo;
    });
    this.setState({ repos });
  }

  fetchRepos = async () => {
    const rawResponse = await fetch(
      "https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc"
    );
    return JSON.parse(await rawResponse.text());
  };

  render() {
    const { repos } = this.state;
    return (
      <div className="app">
        <section className="repos-list">
          <header className="repos-list__header">
            <h1 className="repos-list__title">
              List of trending repositories in GitHub
            </h1>
          </header>

          <div className="repos-list__content">
            {repos.length > 0 ? (
              repos.map((repo: TRepo) => (
                <RepoItem repoInfo={repo} key={`repo-item-${repo.id}`} />
              ))
            ) : (
              <Loader>Loading...</Loader>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
