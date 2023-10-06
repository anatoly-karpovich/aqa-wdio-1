import { BasePage } from "../basePage.page.js";

class AddNewProductPage extends BasePage {
  get ["Name input"]() {
    return `#inputName`;
  }

  get ["Price input"]() {
    return `#inputPrice`;
  }

  get ["Amount input"]() {
    return `#inputAmount`;
  }

  get ["Notes input"]() {
    return `#textareaNotes`;
  }

  get ["Save New Product button"]() {
    return `#save-new-product`;
  }
}

export default new AddNewProductPage();