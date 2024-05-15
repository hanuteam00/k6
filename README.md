# Tutorial
https://www.youtube.com/playlist?list=PLFGoYjJG_fqoum_IoPpbLN3AwWIWtr6hq

# Install k6
brew install k6

cd k6

create a file script.js
ls to check file list

# Add content for script

import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

# Understand code structure
// init
export default function () {
  // vu code: do things here...
}
init code, which prepares the test, and VU code, which makes requests.
Code in the init context defines functions and configures the test options (like duration).
Every test also has a default function, which defines the VU logic.

# Run k6 and see report
//default: 10 looping VUs for 30s (gracefulStop: 30s)
k6 run script.js

# Add VUs
CLI: k6 run --vus 5 --duration 15s script.js

# Using options
Way 1 - when running the script with flags: k6 run --vus 5 --duration 15s script.js
Way 2 - in JS file and run the script without flags

import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

Way 3 - if vus/duration are configured in both JS file and run with flags, then flags will have higher priority

# End-of-test summary
https://grafana.com/docs/k6/latest/get-started/results-output/#end-of-test-summary

# Results output

## Custom report with handleSummary()

## External outputs
k6 run \
--out json=test.json \
--out influxdb=http://localhost:8086/k6
--out csv=csv_result.csv script.js

## # Install go and xk6
1. install Go: https://go.dev/doc/install
2. open new terminal to install xk6-output-statsd
go install go.k6.io/xk6/cmd/xk6@latest
3. Build with xk6: https://github.com/LeonAdato/xk6-output-statsd?tab=readme-ov-file
xk6 build --with github.com/LeonAdato/xk6-output-statsd

# Testing sites
https://dummyjson.com/docs/auth
https://reqres.in/api/login

## Script#4 - Shared & Per VUs Iterations With K6 || Performance Testing
case 1: share VUs iterations (https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/shared-iterations/)
vu = 10
iters = 20
-> each vu = 200/10 ~ 20 iters (sẽ có cái chạy nhanh cái chạy châm để đạt target)

case 2: per VUs iterations
vu = 10
iters = 20
-> each vu = 200/10 = 20 iters (sẽ phân bổ đều để đạt target)

## 90th percentile and 95th percentile	