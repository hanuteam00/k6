import { chromium } from "k6/experimental/browser";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export let options = {
  vus: 5,
  iterations: 10,
};

export default async function () {
  //const browser = chromium.launch({ headless: false });
  const browser = chromium.launch({
    args: ["no-sandbox"],
    headless: true,
    timeout: "60s",
  });
  const context = browser.newContext();
  const page = context.newPage();
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  );
  page.screenshot({ path: "screenshots/browserTestScreenshot.png" });
  page.locator("#input-email").type("lambdatest.Cypress@disposable.com");
  page.locator("#input-password").type("Cypress123!!");
  const submitButton = page.locator('input[value="Login"]');
  await Promise.all([page.waitForNavigation(), submitButton.click()]);
  check(page, {
    "Verify user is logged In": () =>
      page.locator(".breadcrumb-item.active").textContent() == "Account",
  });
  check(page, {
    "Verify the text": () =>
      page.locator(".breadcrumb-item.active").textContent() == "Test",
  });
  page.close();
  browser.close();
}

export function handleSummary(data) {
  return {
    "1Report.html": htmlReport(data, { debug: true }),
  };
}

/*
// Cho phép bạn khởi chạy một trình duyệt Chromium để thực hiện kiểm thử trên trình duyệt
import { chromium } from "k6/experimental/browser";
// import là hàm check, được nhập từ module k6, và được sử dụng để thực hiện các phép khẳng định
import { check } from "k6";
// Nhập một báo cáo HTML từ một URL
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

// Định nghĩa các tùy chọn cho kiểm thử
export let options = {
  // chỉ định số lượng người dùng ảo (VUs)
  vus: 5,
  //number of iterations or times each virtual user will execute the test script
  // số lần lặp lại kiểm thử
  iterations: 10,
};

//test function is defined using the export default syntax
// Hàm chính thực hiện kiểm thử
export default async function () {
  // Khởi chạy trình duyệt
  const browser = chromium.launch({ headless: false });
  // Tạo một ngữ cảnh mới cho trình duyệt
  const context = browser.newContext();
  // Tạo một trang mới trong ngữ cảnh
  const page = context.newPage();

  // Điều hướng đến một URL
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  );
  // Chụp ảnh màn hình trang
  //captures a screenshot of the page, which is then saved as screenshots/browserTestScreenshot.png
  page.screenshot({ path: "screenshots/browserTestScreenshot.png" });

  // Nhập email và mật khẩu vào các trường tương ứng
  page.locator("#input-email").type("lambdatest.Cypress@disposable.com");
  page.locator("#input-password").type("Cypress123!!");
  // Tìm nút submit và click vào nó
  const submitButton = page.locator('input[value="Login"]');

  //Promise.all - wait for both the page navigation and the submitButton click to complete
  await Promise.all([page.waitForNavigation(), submitButton.click()]);

  // Kiểm tra xem người dùng đã đăng nhập thành công hay chưa
  check(page, {
    "Verify user is logged In": () =>
      page.locator(".breadcrumb-item.active").textContent() == "Account",
  });
  // Kiểm tra một giá trị text cụ thể trên trang
  check(page, {
    "Verify the text": () =>
      page.locator(".breadcrumb-item.active").textContent() == "Test",
  });

  // Đóng trang và trình duyệt
  page.close();
  browser.close();
}

// Hàm tạo báo cáo sau khi kiểm thử
export function handleSummary(data) {
  return {
    "TestSummaryReport.html": htmlReport(data, { debug: true }),
  };
}
*/
