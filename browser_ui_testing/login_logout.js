import { check, sleep } from "k6";
import { browser } from "k6/experimental/browser";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"],
  },
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto("https://test.k6.io/my_messages.php");

    page.locator('input[name="login"]').type("admin");
    page.locator('input[name="password"]').type("123");

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      header: (p) => p.locator("h2").textContent() == "Welcome, admin!",
    });
    page.screenshot({ path: "screenshots/logged_in.png" });
    page.locator('input[type="submit"]').click;
    await page.click('input[type="submit"]');
    page.screenshot({ path: "screenshots/logged_out.png" });
  } finally {
    page.close();
  }
}
