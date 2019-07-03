import { TRepo, TOwner } from "github-trendings/types";

/**
 * Class to represent Repo in application
 * @field id - Id of Repo in Github
 * @field name - Name of Github Repo
 * @field fullName - Username and Repo name concated with slash
 * @field htmlUrl - Link to Repo in Github
 * @field description - Description of Repo
 * @field language - name of programming language or technology
 * @field stargazersCount - Count of Stars in Github
 * @field owner - Object of Repo's owner
 * @field forks - count of forks
 * @field stargazersUrl - API URL, metainfo of stars
 * @field forksUrl - Same as previous, but for forks
 * TODO: You can make preview of users, who starred this repo
 */
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
