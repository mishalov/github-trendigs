import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import Tagline from "../../components/Tagline";

Enzyme.configure({ adapter: new Adapter() });
const wrappers = [];

const language = "python";
const languageNulled = null;
const stargazersCount = 100;
const forks = 150;

beforeEach(() => {
  wrappers.push(
    shallow(
      <Tagline
        language={language}
        stargazersCount={stargazersCount}
        forks={forks}
      />
    )
  );
  wrappers.push(
    shallow(
      <Tagline
        language={languageNulled}
        stargazersCount={stargazersCount}
        forks={forks}
      />
    )
  );
});

describe("<Loader /> rendering", () => {
  it("renders correctly with language", () => {
    expect(wrappers[0]).toMatchSnapshot();
  });
  it("renders correctly without language", () => {
    expect(wrappers[1]).toMatchSnapshot();
  });
});
