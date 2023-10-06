import HomePage from "../pages/homePage.page.js";

export class BaseSteps {
  async waitForSpinnerToHide() {
    await HomePage.waitForElement(HomePage.Spinner);
  }
}
