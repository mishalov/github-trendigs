declare module "github-trendings/types" {
  export declare type TRepo = {
    id: number;
    name: string;
    fullName: string;
    htmlUrl: string;
    description: string;
    language: string | null;
    stargazersCount: number;
    forks: number;
    owner: TOwner;
    stargazersUrl: string;
    forksUrl: string;
  };

  export declare type TOwner = {
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  };

  export declare type TFetchFilter = {
    language: string;
    created: string;
    starred: boolean;
  };

  export declare type IMultiselectItem = {
    title: string;
    value: string;
  };
}
