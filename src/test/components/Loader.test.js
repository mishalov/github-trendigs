import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import Loader from "../../components/Loader";

Enzyme.configure({ adapter: new Adapter() });
const wrappers = [];

beforeEach(() => {
  wrappers.push(shallow(<Loader>test</Loader>));
});

describe("<Loader /> rendering", () => {
  it("renders correctly", () => {
    expect(wrappers[0]).toMatchSnapshot();
  });
});
