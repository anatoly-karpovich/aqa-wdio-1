import { BasePage } from "./basePage.page.js";

class SignInPage extends BasePage {
  get ["Email input"]() {
    return "#emailinput";
  }

  get ["Password input"]() {
    return "#passwordinput";
  }

  get ["Login button"]() {
    return "button.btn-primary";
  }
}

export default new SignInPage();
