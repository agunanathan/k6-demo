/* Spike test is a variation of stress test, however, it does not gradually increase the load.  It spikes to extreme load over a very short time.

Spike test is used to:
- Detarmine how the service will perform under sudden surge of traffic
- Determine if the servicd will recover without manual intervention once the traffic has eased

Success of a spike test is based on expectations of the service based on the following
- Excellent: Service performance is not degraded during the traffic surge (i.e Response time is similar to that during low traffic time)
- Good: Response time is slower but the service does not produce any errors (i.e All requests are handled)
- Poor: Service produces errors during the traffic surge but it recovers to normal after traffic eases
- Bad: Service crashes and does not recover after traffic eases

*/

import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "10s", target: 100 }, // below normal load
    { duration: "1m", target: 100 }, //
    { duration: "10s", target: 1000 }, // spike to 1000 users in 10 seconds
    { duration: "3m", target: 1000 }, // stay at 1000 users for 3 minutes
    { duration: "10s", target: 100 }, // scale down to 100 users in 10 seconds
    { duration: "3m", target: 100 }, // stay at 100 users for 3 minutes
    { duration: "10s", target: 0 }, // ramp down 0 users in 10 seconds
    // Total duration: Approx 8 minute duration
  ],
};
export default () => {
  http.get(__ENV.API_URL);
  sleep(1);
};
