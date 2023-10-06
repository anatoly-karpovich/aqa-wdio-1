import { BasePage } from "../basePage.page.js";

class ProductsListPage extends BasePage {
  get ["Add new product button"]() {
    return $("button.page-title-header");
  }

  get ["Table row selector"]() {
    return (product: string) => `//tr[./td[text()="${product}"]]`;
  }

  get ["Name by table row"]() {
    return (product: string) => `${this["Table row selector"](product)}/td[1]`;
  }

  get ["Price by table row"]() {
    return (product: string) => `${this["Table row selector"](product)}/td[2]`;
  }

  get ["Manufacturer by table row"]() {
    return (product: string) => `${this["Table row selector"](product)}/td[3]`;
  }
}

export default new ProductsListPage();
