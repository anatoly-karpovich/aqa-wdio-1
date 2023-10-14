import HomePage from "../pages/homePage.page.js";

export class BaseSteps {
  async waitForSpinnerToHide() {
    await HomePage.waitForElement(HomePage.Spinner);
  }

  async waitForPageIsLoaded() {
    await this.waitForSpinnerToHide();
    await browser.pause(500);
  }
}
