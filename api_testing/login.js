// import necessary module
import http from "k6/http";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.2/index.js";

export default function () {
  describe("Login api call to verify response", () => {
    // define URL and payload
    const url = "https://test-api.k6.io/auth/basic/login/";
    const payload = JSON.stringify({
      username: "test_case",
      password: "1234",
    });
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // send a post request and save response as a variable
    const res = http.post(url, payload, params);
    console.log("response -->", res);
    const responseBody = JSON.parse(res.body);
    console.log("response body -->", responseBody);
    // expect statements
    expect(res.status, "Response status").to.equal(200);
    expect(responseBody.first_name, "First name should be jo").to.equal("jo");
    expect(responseBody.last_name, "last name should be smith").to.equal(
      "smith"
    );
    expect(responseBody.email, "email should be jo@example.com").to.equal(
      "jo@example.com"
    );
  });
}
