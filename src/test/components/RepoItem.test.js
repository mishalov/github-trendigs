import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import RepoItem from "../../components/RepoItem";

Enzyme.configure({ adapter: new Adapter() });
const wrappers = [];

const repoInfoMockup = {
  id: 194151280,
  name: "OnDemandMinecraft",
  fullName: "trevor-laher/OnDemandMinecraft",
  htmlUrl: "https://github.com/trevor-laher/OnDemandMinecraft",
  description:
    "An AWS hosted Minecraft server that will only run when players are active. Players can start the server through a simple UI accessed through free Heroku server hosting.",
  language: "Python",
  stargazersCount: 273,
  owner: { login: "trevor-laher", htmlUrl: "https://github.com/trevor-laher" },
  forks: 16,
  stargazersUrl:
    "https://api.github.com/repos/trevor-laher/OnDemandMinecraft/stargazers",
  forksUrl: "https://api.github.com/repos/trevor-laher/OnDemandMinecraft/forks"
};

beforeEach(() => {
  wrappers.push(
    shallow(
      <RepoItem
        repoInfo={repoInfoMockup}
        starred={false}
        starThis={() => {
          return "test_return";
        }}
      />
    )
  );
  wrappers.push(
    shallow(
      <RepoItem repoInfo={repoInfoMockup} starred={true} starThis={() => {}} />
    )
  );
});

describe("<RepoItem /> rendering", () => {
  it("renders correctly not starred", () => {
    expect(wrappers[0]).toMatchSnapshot();
    console.log('wrappers[0].find(".button"): ', wrappers[0].find(".button"));
    wrappers[0]
      .find("Button")
      .first()
      .simulate("click");
  });
  it("renders correctly starred", () => {
    expect(wrappers[1]).toMatchSnapshot();
  });
});
