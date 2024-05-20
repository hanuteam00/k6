# Tutorial
https://atekco.io/1678346807469-k6-cong-cu-de-dang-va-hieu-qua-cho-load-testing-phan-1/
https://atekco.io/1678774933326-k6-cong-cu-de-dang-va-hieu-qua-cho-load-testing-phan-2/
https://viblo.asia/p/gioi-thieu-ve-k6-performance-testing-phan-1-zOQJwQRbVMP

https://k6.io/docs/using-k6/scenarios/executors/
https://k6.io/docs/examples/

https://www.youtube.com/playlist?list=PLFGoYjJG_fqoum_IoPpbLN3AwWIWtr6hq

Một cấu trúc dự án Grafana và K6 hoàn chỉnh có thể bao gồm các thành phần sau:
/my-k6-grafana-project
|-- /k6-tests
|   |-- /scripts
|   |   |-- test1.js
|   |   |-- test2.js
|   |-- /results
|   |   |-- result1.json
|   |   |-- result2.json
|-- /grafana
|   |-- /dashboards
|   |   |-- dashboard1.json
|   |   |-- dashboard2.json
|   |-- /datasources
|   |   |-- datasource1.json
|   |   |-- datasource2.json
|-- docker-compose.yml
|-- README.md

Trong đó:

/k6-tests/scripts: Chứa các tập lệnh kiểm thử K6.
/k6-tests/results: Chứa kết quả của các kiểm thử K6.
/grafana/dashboards: Chứa các bảng điều khiển Grafana dưới dạng tệp JSON.
/grafana/datasources: Chứa các nguồn dữ liệu Grafana dưới dạng tệp JSON.
docker-compose.yml: Tệp Docker Compose để khởi chạy dịch vụ Grafana và InfluxDB (hoặc bất kỳ cơ sở dữ liệu nào khác mà bạn sử dụng để lưu trữ kết quả kiểm thử K6).
README.md: Tệp README mô tả dự án và cách sử dụng nó.
Lưu ý: Cấu trúc dự án trên chỉ là một ví dụ và có thể thay đổi tùy thuộc vào yêu cầu cụ thể của dự án của bạn.

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

//Nếu bạn không đặt trường executor trong tùy chọn của kịch bản, thì giá trị mặc định sẽ là per-vu-iterations. Điều này có nghĩa là mỗi người dùng ảo (VU) sẽ thực hiện số lần lặp lại được chỉ định một cách độc lập.

Dưới đây là một bảng so sánh giữa shared-iterations và per-vu-iterations:
| Executor Type | Virtual Users (VUs) | Iterations | Iterations per VU | Description |
|---------------|---------------------|------------|-------------------|-------------|
| shared-iterations | 10 | 200 | ~20 | Tổng số lần lặp lại (200) được chia sẻ giữa tất cả các VU. Mỗi VU có thể thực hiện số lần lặp lại khác nhau tùy thuộc vào tốc độ mà nó hoàn thành các lần lặp lại. |
| per-vu-iterations | 10 | 200 | 20 | Trong trường hợp này, mỗi VU sẽ thực hiện một số lần lặp lại cố định (20). Tất cả các VU đều thực hiện cùng một số lần lặp lại, đảm bảo phân bổ đều. |

## 90th percentile and 95th percentile	


## Performing Load Testing on browsers using k6
https://www.lambdatest.com/blog/k6-testing-tutorial/
https://github.com/Anshita-Bhasin/Browser-Testing-K6

K6_BROWSER_ENABLED=true k6 run <path to browser test js file> browserTest.js
(eg: K6_BROWSER_ENABLED=true k6 run 5.browserTest/browserTest.js)

- It is important to know the above configuration K6_BROWSER_ENABLED=true is only required for browser testing and not for API Testing. 
- For API testing, you can run directly using k6 run testFile.js

### K6 Executors
https://k6.io/docs/using-k6/scenarios/executors/


The following table lists all k6 executors and links to their documentation.

| Name | Value | Description |
| --- | --- | --- |
| Shared Iterations | `shared-iterations` | A fixed amount of iterations are shared between a number of VUs. |
| Per VU Iterations | `per-vu-iterations` | Each VU executes an exact number of iterations. |
| Constant VUs | `constant-vus` | A fixed number of VUs execute as many iterations as possible for a specified amount of time. |
| Ramping VUs | `ramping-vus` | A variable number of VUs execute as many iterations as possible for a specified amount of time. |
| Constant Arrival Rate | `constant-arrival-rate` | A fixed number of iterations are executed in a specified period of time. |
| Ramping Arrival Rate | `ramping-arrival-rate` | A variable number of iterations are executed in a specified period of time. |
| Externally Controlled | `externally-controlled` | Control and scale execution at runtime via k6's REST API or the CLI. |

### K6 duration
Trong k6, duration và maxDuration đều được sử dụng để chỉ định thời gian kiểm tra, nhưng chúng có một số khác biệt quan trọng.

duration: Được sử dụng trong các tùy chọn kịch bản kiểm tra chung và trong các executor như constant-vus, ramping-vus, constant-arrival-rate, và ramping-arrival-rate. Nó chỉ định thời gian tổng cộng mà kịch bản kiểm tra hoặc executor sẽ chạy.

maxDuration: Chỉ được sử dụng trong executor shared-iterations và per-vu-iterations. Nó chỉ định thời gian tối đa mà executor sẽ chạy. Nếu tất cả các lần lặp lại được hoàn thành trước maxDuration, executor sẽ dừng lại sớm.

### K6 iterations
Trong k6, iterations không được sử dụng với executor constant-vus. Executor constant-vus duy trì một số lượng người dùng ảo (VUs) cố định và thực hiện nhiều lần lặp lại càng nhiều càng tốt trong thời gian kiểm tra.

Nếu bạn muốn sử dụng iterations, bạn có thể sử dụng executor shared-iterations hoặc per-vu-iterations. Executor shared-iterations chia sẻ một số lượng cố định các lần lặp lại giữa một số lượng VUs, trong khi per-vu-iterations cho phép mỗi VU thực hiện một số lượng cố định các lần lặp lại.

## Cách kịch bản mẫu

### 1. Kịch bản với người dùng ảo cố định (constant-vus)
Trong ví dụ này, k6 sẽ duy trì 5 người dùng ảo (VUs) trong suốt 1 phút, gửi yêu cầu đến http://test.k6.io càng nhanh càng tốt.
```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-vus',
      vus: 5,
      duration: '1m',
    },
  },
};

export default function () {
  http.get('http://test.k6.io');
}
```

### 2.Kịch bản với tốc độ yêu cầu cố định (constant-arrival-rate)
Trong ví dụ này, k6 sẽ cố gắng gửi 10 yêu cầu mỗi giây đến http://test.k6.io trong suốt 1 phút. Nó sẽ sử dụng tối đa 50 VUs để đạt được tốc độ này.
import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 10,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 50,
    },
  },
};

export default function () {
  http.get('http://test.k6.io');
}

### 3. Kịch bản với số lần lặp cố định cho mỗi VU (per-vu-iterations)
Trong ví dụ này, mỗi VU sẽ thực hiện 10 lần lặp, gửi yêu cầu đến http://test.k6.io. Kịch bản sẽ sử dụng 5 VUs và sẽ kết thúc sau 1 phút hoặc khi tất cả các lần lặp đã hoàn thành, tùy thuộc điều kiện nào đến trước.
import http from 'k6/http';

export const options = {
  scenarios: {
    per_vu_iterations: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 10,
      maxDuration: '1m',
    },
  },
};

export default function () {
  http.get('http://test.k6.io');
}

### 4. Kịch bản với tốc độ yêu cầu tăng dần (ramping-arrival-rate):
Trong ví dụ này, k6 sẽ bắt đầu với tốc độ 50 yêu cầu mỗi giây, sau đó tăng lên 200 yêu cầu mỗi giây trong vòng 30 giây, và cuối cùng giảm xuống 0 yêu cầu mỗi giây trong 30 giây tiếp theo.

import http from 'k6/http';

export const options = {
  scenarios: {
    ramping_request_rate: {
      executor: 'ramping-arrival-rate',
      startRate: '50',
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
};

export default function () {
  http.get('http://test.k6.io');
}

### 5. Kịch bản với số lần lặp cố định chia sẻ giữa các VU (shared-iterations):
Trong ví dụ này, tổng cộng 100 lần lặp sẽ được chia đều giữa 5 VUs. Kịch bản sẽ kết thúc sau 1 phút hoặc khi tất cả các lần lặp đã hoàn thành, tùy thuộc điều kiện nào đến trước.

import http from 'k6/http';
export const options = {
  scenarios: {
    shared_iterations: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 100,
      maxDuration: '1m',
    },
  },
};

export default function () {
  http.get('http://test.k6.io');
}

### 6. Kịch bản với số lượng VU tăng dần (ramping-vus):
Trong ví dụ này, k6 sẽ bắt đầu với 0 VU, sau đó tăng lên 20 VU trong vòng 30 giây, và cuối cùng giảm xuống 0 VU trong 30 giây tiếp theo.

import http from 'k6/http';

export const options = {
  scenarios: {
    ramping_vus: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
    },
  },
};

export default function () {
  http.get('http://test.k6.io');
}
