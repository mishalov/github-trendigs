import { TOwner } from "github-trendings/types";

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
    this.avatarUrl = param.name;
    this.htmlUrl = param.htmlUrl;
  }
}
