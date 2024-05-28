# k6-demo

# Quick Commands to run k6 tests:

# K6_BROWSER_HEADLESS=false k6 run script.js - This will show what happens on the browser

# K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run script.js

1. The USE Method ( can be thought of as caring for your machines and how happy they are)

- Utilization - % of time that the resource was busy
- Saturation - amount of work resource has to do (queue length)
- Errors - Count of Error events

2. The RED Method ( can be thought of as caring for your users and how happy they are)

- Rate - Number of requests per second
- Errors - number of those requests that are failing
- Duration - amount of time those requests take

  Things to look for for RED Method:

  - http_reqs, to measure requests (measures traffic)
  - http_req_failed, to measure error rate (measures error rate)
  - req_duration, to measure duration (measures latency)

3. The Four Golden Signlas:

- Latency - time taken to serve a request
- Traffic - how much demand is placed on your system
- Errors - rate of requests that are failing
- Saturation - how full your service is

<!-- Understanding the results -->
<!--
   ✓ checks.........................: 100.00% ✓ 40      ✗ 0   :  The number of completed Checks - all of them passed
     data_received..................: 75 kB   1.6 kB/s
     data_sent......................: 12 kB   261 B/s
     http_req_blocked...............: avg=23.24ms  min=1µs   med=4µs    max=128.45ms p(95)=92.61ms p(99)=115.06ms p(99.99)=128.31ms count=40
     http_req_connecting............: avg=10.51ms  min=0s    med=0s     max=45.44ms  p(95)=43.75ms p(99)=45.07ms  p(99.99)=45.43ms  count=40
   ✗ http_req_duration..............: avg=7.18s    min=2.94s med=5.54s  max=13.85s   p(95)=12.15s  p(99)=13.7s    p(99.99)=13.85s   count=40
       { expected_response:true }...: avg=7.18s    min=2.94s med=5.54s  max=13.85s   p(95)=12.15s  p(99)=13.7s    p(99.99)=13.85s   count=40
   ✓ http_req_failed................: 0.00%   ✓ 0       ✗ 40
     http_req_receiving.............: avg=102.32µs min=25µs  med=89µs   max=347µs    p(95)=232.3µs p(99)=311.89µs p(99.99)=346.64µs count=40
     http_req_sending...............: avg=36.9µs   min=12µs  med=25.5µs max=124µs    p(95)=90.44µs p(99)=121.66µs p(99.99)=123.97µs count=40
     http_req_tls_handshaking.......: avg=11.56ms  min=0s    med=0s     max=51.9ms   p(95)=48.71ms p(99)=51.27ms  p(99.99)=51.89ms  count=40
     http_req_waiting...............: avg=7.18s    min=2.94s med=5.54s  max=13.85s   p(95)=12.15s  p(99)=13.7s    p(99.99)=13.85s   count=40
     http_reqs......................: 40      0.86778/s
     iteration_duration.............: avg=7.21s    min=2.94s med=5.59s  max=13.85s   p(95)=12.15s  p(99)=13.7s    p(99.99)=13.85s   count=40
     iterations.....................: 40      0.86778/s
     vus............................: 2       min=1     max=10 -->
