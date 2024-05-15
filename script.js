import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    //set options of vus and duration, default are vus: 10, duration: '30s',
  vus: 5,
  duration: '10s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}