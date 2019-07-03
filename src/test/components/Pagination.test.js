import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import Pagination from "../../components/Pagination";

Enzyme.configure({ adapter: new Adapter() });
const wrappers = [];

beforeEach(() => {
  wrappers.push(shallow(<Pagination pageNow={0}>test</Pagination>));
  wrappers.push(shallow(<Pagination pageNow={1}>test</Pagination>));
  wrappers.push(shallow(<Pagination pageNow={2}>test</Pagination>));
  wrappers.push(shallow(<Pagination pageNow={3}>test</Pagination>));
  wrappers.push(shallow(<Pagination pageNow={4}>test</Pagination>));
  wrappers.push(shallow(<Pagination pageNow={5}>test</Pagination>));
  wrappers.push(shallow(<Pagination pageNow={200}>test</Pagination>));
});

describe("<Loader /> rendering", () => {
  it("renders correctly", () => {
    expect(wrappers[0]).toMatchSnapshot();
  });
  it("render at firts page correctly", () => {
    expect(wrappers[1]).toMatchSnapshot();
  });
  it("render at page 2 correctly", () => {
    expect(wrappers[2]).toMatchSnapshot();
  });
  it("render at page 3 correctly", () => {
    expect(wrappers[3]).toMatchSnapshot();
  });
  it("render at page 4 correctly", () => {
    expect(wrappers[4]).toMatchSnapshot();
  });
  it("render at page 5 correctly", () => {
    expect(wrappers[5]).toMatchSnapshot();
  });
  it("render at page 200 correctly", () => {
    expect(wrappers[6]).toMatchSnapshot();
  });
});
