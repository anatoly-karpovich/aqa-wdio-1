import type { IUserCredentials } from "../../types/user/user.types.js";
import { logStep } from "../../utils/reporter/reporter.js";
import SignInPage from "../pages/signInPage.page.js";
import { BaseSteps } from "./baseSteps.js";

class SignInSteps extends BaseSteps {
  @logStep("Login to Sales Portal")
  async signIn(credentials?: IUserCredentials) {
    await SignInPage.setValue(SignInPage["Email input"], credentials ? credentials.email : "aqacourse@gmail.com");
    await SignInPage.setValue(SignInPage["Password input"], credentials ? credentials.password : "password");
    await browser.pause(200);
    await SignInPage.click(SignInPage["Login button"]);
    await this.waitForPageIsLoaded();
  }
}

export default new SignInSteps();
