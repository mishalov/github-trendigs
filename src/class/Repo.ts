import { TRepo, TOwner } from "github-trendings/types";

export class Repo implements TRepo {
  public id: number;
  public name: string;
  public fullName: string;
  public htmlUrl: string;
  public description: string;
  public language: string | null;
  public stargazersCount: number;
  public owner: TOwner;
  public forks: number;
  public stargazersUrl: string;
  public forksUrl: string;
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
    this.stargazersUrl = param.stargazersUrl;
    this.forksUrl = param.forksUrl;
  }
}
