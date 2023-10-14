import { BaseSteps } from "../baseSteps.js";
import ProductsListPage from "../../pages/products/productsList.page.js";
import { logStep } from "../../../utils/reporter/reporter.js";

class ProductsListSteps extends BaseSteps {
  @logStep("Open Add New Product page")
  async openAddNewProductPage() {
    await ProductsListPage["Add new product button"].click();
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Product Details modal")
  async openDetailsModalForCreatedProduct(productName: string) {
    await ProductsListPage.click(ProductsListPage["Details button by product name"](productName));
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Edit Product modal")
  async openEditProductModalForCreatedProduct(productName: string) {
    await ProductsListPage.click(ProductsListPage["Edit button by product name"](productName));
    await this.waitForPageIsLoaded();
  }
  @logStep("Open Delete Product modal")
  async openDeleteProductModalForCreatedProduct(productName: string) {
    await ProductsListPage.click(ProductsListPage["Delete button by product name"](productName));
    await this.waitForPageIsLoaded();
  }
}

export default new ProductsListSteps();
