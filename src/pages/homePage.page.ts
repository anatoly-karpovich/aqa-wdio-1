import { BasePage } from "./basePage.page.js";

class HomePage extends BasePage {
  get ["Products button"]() {
    return "#products-from-home";
  }
}

export default new HomePage();
