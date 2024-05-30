import { browser } from "k6/experimental/browser";
import { check } from "k6";
import http from "k6/http";
import { HtmlElementsPage } from "../browser_ui_testing/page_objects/html_elements_page.js";

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
  const htmlElementsPage = new HtmlElementsPage(page);
  try {
    // Incrementor function
    await htmlElementsPage.goto();
    page.screenshot({ path: "screenshots/beforeAll.png" });
    check(page, {
      "counter should be at 0 before clicking incrementor button":
        htmlElementsPage.counterInfoDisplay.textContent() === "Counter: 0",
    });

    await htmlElementsPage.counterButton.click();
    check(page, {
      "counter should be at 1 after clicking incrementor button once":
        htmlElementsPage.counterInfoDisplay.textContent() === "Counter: 1",
    });
    page.screenshot({ path: "screenshots/counterAtOne.png" });

    // Checkbox Function
    await htmlElementsPage.checkBox1.check();
    check(page, {
      "checkbox is checked":
        htmlElementsPage.checkBoxInfoDisplay.textContent() ===
        "Thanks for checking the box",
    });
    page.screenshot({ path: "screenshots/afterAll.png" });
  } finally {
    page.close();
  }
}
