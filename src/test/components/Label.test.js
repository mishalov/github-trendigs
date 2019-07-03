import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import Button from "../../components/Button";
import Label from "../../components/Label";

Enzyme.configure({ adapter: new Adapter() });
const wrappers = [];

beforeEach(() => {
  wrappers.push(shallow(<Label>test</Label>));
  wrappers.push(
    shallow(
      <Label className="test-class">
        <Button>test</Button>
      </Label>
    )
  );
});

describe("<Label /> rendering", () => {
  it("renders correctly", () => {
    expect(wrappers[0]).toMatchSnapshot();
  });
  it("attributes test", () => {
    expect(wrappers[1]).toMatchSnapshot();
  });
});
