/* Load test is primarily used to determine the performance of the service in terms of number of concurrent users it can handle or response time.
This is a good test to find out the initial benchmarks that can be used for stress and spike testing

Load test is used to:
- Determine service's current performance under typical and peak load
- Determine if you are continuously meeting performance standards as you make changes

*/

import http from "k6/http";
import { sleep, check } from "k6";

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

const API_URL = "https://test-api.k6.io/auth/basic/login/";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  // httpDebug: 'false', // false or 'full'
  summaryTrendStats: [
    "avg",
    "min",
    "med",
    "max",
    "p(95)",
    "p(99)",
    "p(99.99)",
    "count",
  ],
  stages: [
    { duration: "10s", target: 20 },
    { duration: "50s", target: 20 },
    //....
  ],
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.2", abortOnFail: true }], // availability threshold for error rate
    http_req_duration: ["p(99)<1000"], // Latency threshold for percentile
    // fail the test if any checks fail or any requests fail
    checks: ["rate == 1.00"],
    http_req_failed: ["rate == 0.00"],
  },
};

export default () => {
  // define URL and request body
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

  // check that response is 200
  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
};
