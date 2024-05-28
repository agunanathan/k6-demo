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
    { duration: "10s", target: 3 }, // simulate ramp-up of traffic from 1 to 3 vu's in 10 seconds
    { duration: "5s", target: 3 }, // stay at 3 users for 5 seconds
    { duration: "20s", target: 6 }, // ramp-up to 6 users for the next 20 seconds
    { duration: "10s", target: 0 }, // ramp down to 0 users
  ],
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }], // http errors should be less than 1% ( Setting can be 0 to 1.00)
    http_req_duration: [
      "avg<6000",
      "min<3000",
      "med<6000",
      "max<15000",
      "p(95)<8000",
      "p(99)<15000",
    ],
    checks: [{ threshold: "rate==1.00", abortOnFail: true }],
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
