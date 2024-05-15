import http from "k6/http";
import { sleep } from "k6";

//set options of vus and duration, default are vus: 10, duration: '30s',
// export const options = {
//   vus: 5,
//   duration: "10s",
// };

export default function () {
  const url = "https://dummyjson.com/docs/auth";

  //payload should be in json format
  JSON.stringify({
    username: "kminchelle",
    password: "0lelplR",
    expiresInMins: 30, // optional, defaults to 60
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
}
