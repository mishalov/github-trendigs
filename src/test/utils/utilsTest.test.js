import { divideNumbers } from "../../utils/divideNumbers";
import { objectKeysToCamelCase } from "../../utils/toCamelCase";

describe("Testing UTILS function", function() {
  test("Testing divideNumbers", function() {
    const divided1 = divideNumbers(124000);
    const divided2 = divideNumbers(124);
    const divided3 = divideNumbers("something");
    const divided4 = divideNumbers("1240000");
    expect(divided1).toBe("124 000");
    expect(divided2).toBe("124");
    expect(divided3).toBe("");
    expect(divided4).toBe("1 240 000");
  });

  test("Testing toCamelCase", function() {
    const snakeCased = objectKeysToCamelCase({
      first_test: {
        first_test_field: "test",
        second_test_field: ["1", "2", "3"]
      }
    });
    expect(snakeCased).toHaveProperty("firstTest");
    expect(snakeCased.firstTest).toHaveProperty("firstTestField");
    expect(snakeCased.firstTest.firstTestField).toBe("test");
    expect(snakeCased.firstTest.secondTestField).toHaveLength(3);
  });
});
