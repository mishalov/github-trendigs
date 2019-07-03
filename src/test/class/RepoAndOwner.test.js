import { shallow } from "enzyme";
import { Repo } from "../../class/Repo";
import { Owner } from "../../class/Owner";

const ownerMockup = {
  login: "testLogin",
  avatarUrl: "testAvaterUrl",
  htmlUrl: "testHtmlUrl"
};

const ownerMockupWrong = {
  login: "testLogin",
  avatarUrl: "testAvaterUrl",
  htmlUrlWRONG: "testHtmlUrl"
};

const repoMockup = {
  id: 1,
  name: "testName",
  fullName: "testFullName",
  htmlUrl: "testHtmlUrl",
  description: "testDescription",
  language: "testLanguage",
  stargazersUrl: "testStargazersUrl",
  owner: ownerMockup,
  forks: 10,
  stargazersCount: 15,
  forksUrl: "testForksUrl"
};

const repoMockupWrong = {
  id: 1,
  name: "testName",
  fullName: "testFullName",
  htmlUrl: "testHtmlUrl",
  description: "testDescription",
  language: "testLanguage",
  stargazersUrl: "testStargazersUrl",
  owner: ownerMockup,
  forks: 10,
  stargazersCount: 15,
  forksUrlWRONGFIELD: "testForksUrl"
};

describe("Testing Repo and Owner classes creation", function() {
  test("Creating Repo instance", function() {
    const owner = new Owner(ownerMockup);
    expect(owner.login).toBe("testLogin");
    expect(owner.avatarUrl).toBe("testAvaterUrl");
    expect(owner.htmlUrl).toBe("testHtmlUrl");
    const testRepo1 = new Repo(repoMockup);
    testRepo1.owner = owner;
    expect(testRepo1.id).toBe(1);
    expect(testRepo1.name).toBe("testName");
    expect(testRepo1.fullName).toBe("testFullName");
    expect(testRepo1.htmlUrl).toBe("testHtmlUrl");
    expect(testRepo1.description).toBe("testDescription");
    expect(testRepo1.language).toBe("testLanguage");
    expect(testRepo1.stargazersUrl).toBe("testStargazersUrl");
    expect(testRepo1.owner).toEqual(ownerMockup);
    expect(testRepo1.owner instanceof Owner).toBe(true);
    expect(testRepo1.forks).toBe(10);
    expect(testRepo1.stargazersCount).toBe(15);
    expect(testRepo1.forksUrl).toBe("testForksUrl");

    function makeWrongRepo() {
      new Repo(repoMockupWrong);
    }

    function makeWrongOwner() {
      new Owner(ownerMockupWrong);
    }
    expect(makeWrongRepo).toThrowError();
    expect(makeWrongOwner).toThrowError();
  });
});
