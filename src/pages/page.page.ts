import { findElement } from "../utils/elements/findElement.js";

const TIMEOUT_5_SECS = 5000;

export class Page {
  async waitForElement(selector: string, timeout = TIMEOUT_5_SECS) {
    const element = await findElement(selector);
    element.waitForDisplayed({ timeout });
    return element;
  }

  async setValue(selector: string, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(selector, timeout);
    await element.setValue(value);
  }

  async click(selector: string, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(selector, timeout);
    await element.click();
  }
}
