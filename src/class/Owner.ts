import { TOwner } from "github-trendings/types";

/**
 * Class to represent owner of Repo in application
 * @field login - Username in Github
 * @field avatarUrl - URL of user's avatar
 * @field htmlUrl - link to user's page in Github
 */
export class Owner implements TOwner {
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
    this.avatarUrl = param.avatarUrl;
    this.htmlUrl = param.htmlUrl;
  }
}
