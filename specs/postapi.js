import http from "k6/http";
import { sleep } from "k6";
import {check} from "k6";

//set options of vus and duration, default are vus: 10, duration: '30s',
export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const url = "https://dummyjson.com/docs/auth";

  //payload should be in json format
  const payload = JSON.stringify({
    username: "kminchelle",
    password: "0lelplR",
    // expiresInMins: 30, // optional, defaults to 60
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "is status 200": (r) => r.status === 200,
    "is res body": (r) => r.body.includes("kminchelle"),
    // "transaction time OK": (r) => r.timings.duration < 200,
  });
}
