/*
Soak testing is used to validate reliability of the system over a long time

- Verify that the service doesn't suffer from bugs or memory leaks which could result in a crash
- Verify that the service restarts and doesn't lose requests
- finds bugs related to race-conditions that apear sporadically
- verifies that the database doesn't exhaust the allotted storage space and stops
- verifis that logs don't exhaust alloted disk storage
- verifies that dependent external services dont' stop working after a certain amount of requests

To run setup a soak test:
- Determine the maximum amount of users the service can handle
- Get the 75-80% of that value
- Set the vus to that value
- Run the test in 3 statges.  Ramp up the vus, stay there for 4-12 hours, ramp down to 0
*/

import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "2m", target: 400 }, // ramp up to 400 users
    { duration: "4h", target: 400 }, // stay at 400 for 4 hours
    { duration: "2m", target: 0 }, // scale down
    // aproximate duration: 4 hours
  ],
};

export default () => {
  http.get(__ENV.API_URL);
  sleep(1);
};
