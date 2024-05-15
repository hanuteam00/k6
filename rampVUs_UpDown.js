import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  /*Ramp VUs up and down in stages
  https://grafana.com/docs/k6/latest/get-started/running-k6/#ramp-vus-up-and-down-in-stages
  */
  stages: [
    { duration: "15s", target: 5 },
    { duration: "5s", target: 2 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const res = http.get("https://httpbin.test.k6.io/");
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}
