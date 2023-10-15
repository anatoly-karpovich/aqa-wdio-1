import { logStep } from "../../utils/reporter/reporter.js";
import SignInPage from "../pages/signInPage.page.js";

class CommonSteps {
  async getAuthorizationToken() {
    const token = (await browser.getCookies("Authorization"))[0]?.value;
    return token;
  }

  @logStep("Open Sales Portal")
  async openSalesPortal() {
    await SignInPage.openPage("https://anatoly-karpovich.github.io/aqa-course-project/#");
  }
}

export default new CommonSteps();
