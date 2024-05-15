import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

//set options of vus and duration, default are vus: 10, duration: '30s',
// export const options = {
//   vus: 1,
//   duration: "1s",
// };

export default function () {
  const url = "https://reqres.in/api/login";

  //payload should be in json format
  const payload = JSON.stringify({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
    // expiresInMins: 30, // optional, defaults to 60
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "TC1: is status 200": (r) => r.status === 200,
    "TC2: is res body contain": (r) => r.body.includes("token"),
    // "transaction time OK": (r) => r.timings.duration < 200,
  });
}
