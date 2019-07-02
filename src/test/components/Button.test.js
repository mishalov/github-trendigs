import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import Button from "../../components/Button";

Enzyme.configure({ adapter: new Adapter() });
const wrappers = [];

beforeEach(() => {
  wrappers.push(shallow(<Button />));
  wrappers.push(shallow(<Button>test</Button>));
  wrappers.push(shallow(<Button status="disabled">test</Button>));
  wrappers.push(shallow(<Button status="success">test</Button>));
  wrappers.push(
    shallow(
      <Button
        text="test button"
        onClick={() => {
          alert("test button pressed");
        }}
      />
    )
  );
});

describe("<Button /> rendering", () => {
  it("renders correctly", () => {
    expect(wrappers[0]).toMatchSnapshot();
  });
  it("with text renders correctly", () => {
    expect(wrappers[1]).toMatchSnapshot();
  });
  it("with text and DISABLED status renders correctly", () => {
    expect(wrappers[2]).toMatchSnapshot();
  });
  it("with text and SUCCESS status renders correctly", () => {
    expect(wrappers[3]).toMatchSnapshot();
  });
  it("primary button with text and onClick renders correctly", () => {
    expect(wrappers[4]).toMatchSnapshot();
  });
});
