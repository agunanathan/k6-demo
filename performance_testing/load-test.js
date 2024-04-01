/* Load test is primarily used to determine the performance of the service in terms of number of concurrent users it can handle or response time.
This is a good test to find out the initial benchmarks that can be used for stress and spike testing

Load test is used to:
- Detarmine service's current performance under typical and peak load
- Determine if you are continuously meeting performance standards as you make changes

*/

import http from 'k6/http';
import { sleep, check } from 'k6';

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
  return {
    'result.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

const API_URL = __ENV.API_URL;
const REQUEST_THRESHOLD = __ENV.REQUEST_THRESHOLD; // 'p(95)<1500'
const REQUEST_COUNT = __ENV.REQUEST_COUNT; // 'count<15'

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  // httpDebug: 'false', // false or 'full'
  summaryTrendStats: [
    'avg',
    'min',
    'med',
    'max',
    'p(95)',
    'p(99)',
    'p(99.99)',
    'count',
  ],
  stages: [
    { duration: '5s', target: 10 }, // ramp up users to 100 in 15 seconds
    { duration: '5s', target: 50 }, // ramp up users to 500 in 30 seconds
    { duration: '5s', target: 0 }, // ramp down to 0 users in 15 seconds
  ],
  thresholds: {
    http_req_duration: [REQUEST_THRESHOLD], // 99% of requests should complete within 150ms
    http_reqs: [REQUEST_COUNT],
    // fail the test if any checks fail or any requests fail
    checks: ['rate == 1.00'],
    http_req_failed: ['rate == 0.00'],
  },
};

export default () => {
  const response = http.get(API_URL);
  sleep(1);
  check(response, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
  });
};
