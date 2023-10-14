import { BaseSteps } from "./baseSteps.js";
import HomePage from "../pages/homePage.page.js";
import { logStep } from "../../utils/reporter/reporter.js";

class HomeSteps extends BaseSteps {
  @logStep("Open Products Page")
  async openProductsPage() {
    await HomePage.click(HomePage["Products button"]);
    await this.waitForSpinnerToHide();
  }
}

export default new HomeSteps();
