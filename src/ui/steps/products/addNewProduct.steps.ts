import { IProduct } from "../../../types/products/product.types.js";
import { BaseSteps } from "../baseSteps.js";
import AddNewProductPage from "../../pages/products/addNewProduct.page.js";

class AddNewProductSteps extends BaseSteps {
  async fillProductInputs(product: IProduct) {
    // (await AddNewProductPage["Name input"]).setValue(product.name);
    await AddNewProductPage.setValue(AddNewProductPage["Name input"], product.name);
    //Manufacturer my yourself
    await AddNewProductPage.setValue(AddNewProductPage["Price input"], `${product.price}`);
    await AddNewProductPage.setValue(AddNewProductPage["Amount input"], `${product.amount}`);

    if (product.notes) {
      await AddNewProductPage.setValue(AddNewProductPage["Notes input"], product.notes);
    }
    await browser.pause(200);
  }

  async clickOnSaveNewProductButton() {
    await AddNewProductPage.click(AddNewProductPage["Save New Product button"]);
  }

  async createProduct(product: IProduct) {
    await this.fillProductInputs(product);
    await this.clickOnSaveNewProductButton();
    await this.waitForSpinnerToHide();
  }
}

export default new AddNewProductSteps();
