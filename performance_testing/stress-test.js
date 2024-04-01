/* Used to determine the limits of the service.  To determine the stability and reliability of the service under extreme conditions.

Stress test is used to:
- Detarmine how the service will behave under extreme conditions
- Determine what the maximum capacity of the service is in terms of users or throughput
- Determine the breaking point of the service and its failure mode
- Determine if the service will recover without manual intervention after the stress test is completed

*/

import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "1m", target: 100 }, // below normal load
    { duration: "2m", target: 100 }, //
    { duration: "1m", target: 200 }, // normal load
    { duration: "2m", target: 200 }, //
    { duration: "1m", target: 300 }, // around breaking point
    { duration: "2m", target: 300 }, //
    { duration: "1m", target: 400 }, // beyond breaking point
    { duration: "2m", target: 400 }, //
    { duration: "5m", target: 0 }, // scale down
    // aproximate duration: 17 minutes
  ],
};

export default () => {
  http.batch([["GET", __ENV.API_URL]]);

  sleep(1);
};
