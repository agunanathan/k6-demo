export class HtmlElementsPage {
  constructor(page) {
    this.page = page;
    this.checkBoxInfoDisplay = page.locator("#checkbox-info-display");
    this.counterButton = page.locator('button[id="counter-button"]');
    this.checkBox1 = page.locator("#checkbox1");
    this.counterInfoDisplay = page.locator("#counter-info-display");
    this.textField1 = page.locator("#text1");
    this.numbersOption = page.locator("#numbers-options");
    this.colorsOption = page.locator("#colors-options");
  }
  async goto() {
    await this.page.goto("https://test.k6.io/browser.php");
  }
}
