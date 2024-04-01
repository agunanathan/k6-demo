import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";

export default function testSuite() {
  const success1 = describe("Basic test", () => {
    expect(1, "number one").to.equal(1);
  });
  console.log(success1); // true

  const success2 = describe("Another test", () => {
    throw "Something entirely unexpected happened";
  });
  console.log(success2); // false

  const success3 = describe("Yet another test", () => {
    expect(false, "my vaule").to.be.true();
  });
  console.log(success3); // false
}
