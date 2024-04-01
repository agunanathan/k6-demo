import { check } from "k6";
import http from "k6/http";

export default function () {
  // get example
  const res = http.get("http://test.k6.io/");
  console.log("response====>", res);
  console.log("body length ====>", res.body.length);
  check(res, {
    "is status 200": (r) => r.status === 200,
    "body size is 11,105 bytes": (r) => r.body.length == 11278,
    "verify homepage text": (r) =>
      r.body.includes(
        "Collection of simple web-pages suitable for load testing"
      ),
  });
}
