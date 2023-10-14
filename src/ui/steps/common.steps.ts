import { logStep } from "../../utils/reporter/reporter.js";

class CommonSteps {
  async getAuthorizationToken() {
    const token = (await browser.getCookies("Authorization"))[0]?.value;
    return token;
  }

  @logStep("Open Sales Portal")
  async openSalesPortal() {
    await browser.url("https://anatoly-karpovich.github.io/aqa-course-project/#");
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe("https://anatoly-karpovich.github.io/aqa-course-project/#");
  }
}

export default new CommonSteps();
