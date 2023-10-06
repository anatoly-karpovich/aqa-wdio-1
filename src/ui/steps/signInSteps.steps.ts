import { IUserCredentials } from "../pages/types/user.types.js";
import SignInPage from "../pages/signInPage.page.js";
import { BaseSteps } from "./baseSteps.js";

class SignInSteps extends BaseSteps {
  async signIn(credentials?: IUserCredentials) {
    await SignInPage.setValue(SignInPage["Email input"], credentials ? credentials.email : "aqacourse@gmail.com");
    await SignInPage.setValue(SignInPage["Password input"], credentials ? credentials.password : "password");
    await browser.pause(200);
    await SignInPage.click(SignInPage["Login button"]);
    await this.waitForSpinnerToHide();
  }
}

export default new SignInSteps();
