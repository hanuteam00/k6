// Import các module cần thiết từ thư viện k6 và một báo cáo HTML từ một URL
import { check } from "k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Định nghĩa các tùy chọn cho kịch bản kiểm tra tải
export const options = {
  scenarios: {
    browser: {
      exec: "browser", // Chỉ định hàm "browser" để thực thi cho mỗi VU
      /*
      iterations không được sử dụng với executor constant-vus
      Executor constant-vus duy trì một số lượng người dùng ảo (VUs) cố định và thực hiện nhiều lần lặp lại càng nhiều càng tốt trong thời gian kiểm tra
      Nếu bạn muốn sử dụng iterations, bạn có thể sử dụng executor shared-iterations hoặc per-vu-iterations. Executor shared-iterations chia sẻ một số lượng cố định các lần lặp lại giữa một số lượng VUs, trong khi per-vu-iterations cho phép mỗi VU thực hiện một số lượng cố định các lần lặp lại.
      */
     /*
      executor: "constant-vus", // Sử dụng executor "constant-vus" để giữ số lượng người dùng ảo (VUs) không đổi trong suốt thời gian kiểm tra
      vus: 10, // Số lượng VUs
      */
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: "0.5m",
      /*
      duration: Được sử dụng trong các tùy chọn kịch bản kiểm tra chung và trong các executor như constant-vus, ramping-vus, constant-arrival-rate, và ramping-arrival-rate. Nó chỉ định thời gian tổng cộng mà kịch bản kiểm tra hoặc executor sẽ chạy.
      duration: "20s", // Thời gian kiểm tra
      */
      gracefulStop: "0s", // do not wait for iterations to finish in the end
    },
  },
};

// Định nghĩa hàm "browser" để thực thi cho mỗi VU
export function browser() {
  // Thực hiện một yêu cầu POST đến URL đăng nhập với thông tin đăng nhập
  const response = http.post(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login",
    {
      "input-email": "lambdatest.Cypress@disposable.com",
      "input-password": "Cypress123!!",
    }
  );

  // Kiểm tra phản hồi từ yêu cầu POST
  check(response, {
    // Kiểm tra xem người dùng có được đăng nhập thành công không
    "user is logged in": (res) =>
      res.status === 200 && res.body.includes("My Account"),
  });
}

// Định nghĩa hàm để xử lý báo cáo sau khi kiểm tra tải kết thúc
export function handleSummary(data) {
  const customTitle = "API Load Test"; // Tiêu đề tùy chỉnh cho báo cáo
  const reportTitle = `${customTitle} - ${new Date().toLocaleDateString()}`; // Tiêu đề báo cáo bao gồm tiêu đề tùy chỉnh và ngày hiện tại

  // Get current time in milliseconds
  const currentTime = new Date().getTime();

  console.log(currentTime);
  // Trả về một báo cáo HTML với dữ liệu từ kiểm tra tải và tiêu đề báo cáo
  return {
    [`reports/apiTestSummaryReport_${currentTime}.html`]: htmlReport(data, {
      title: reportTitle,
    }),
  };
}
