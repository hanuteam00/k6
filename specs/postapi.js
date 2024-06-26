import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

//set options of vus and duration, default are vus: 10, duration: '30s',
export const options = {
  vus: 5,
  duration: "10s",
};

export default function () {
  const url = "https://dummyjson.com/auth/login";

  //payload should be in json format
  const payload = JSON.stringify({
    username: "kminchelle",
    password: "0lelplR",
    expiresInMins: 30, // optional, defaults to 60
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "TC1: is status 200": (r) => r.status === 200,
    "TC2: is res body": (r) => r.body.includes("kminchelle"),
    // "transaction time OK": (r) => r.timings.duration < 200,
  });
}
