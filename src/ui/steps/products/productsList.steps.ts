import { BaseSteps } from "../baseSteps.js";
import ProductsListPage from "../../pages/products/productsList.page.js";

class ProductsListSteps extends BaseSteps {
  async openAddNewProductPage() {
    await ProductsListPage["Add new product button"].click();
    await this.waitForSpinnerToHide();
  }
}

export default new ProductsListSteps();
