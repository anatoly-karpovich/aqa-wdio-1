import { BaseSteps } from "./baseSteps.js";
import HomePage from "../pages/homePage.page.js";

class HomeSteps extends BaseSteps {
  async openProductsPage() {
    await HomePage.click(HomePage["Products button"]);
    await this.waitForSpinnerToHide();
  }
}

export default new HomeSteps();
