import { generateNewProduct } from "../../../data/dataGeneration/products/productGeneration.js";
import ProductService from "../../../services/product.service.js";
import { IProduct } from "../../../types/products/product.types.js";
import { Products } from "../../../utils/entities/index.js";
import { logStep } from "../../../utils/reporter/reporter.js";
import { validateResponse } from "../../../utils/validations/apiValidation.js";
import { BaseSteps } from "../baseSteps.js";
import CommonSteps from "../common.steps.js";

class ProductsSteps extends BaseSteps {
  @logStep("Create Product via API")
  async createProductViaApi(customProductFields?: Partial<IProduct>) {
    const product = generateNewProduct(customProductFields);
    const token = await CommonSteps.getAuthorizationToken();
    const response = await ProductService.create({ data: product, token });
    validateResponse(response, 201, true, null);
    Products.addProduct(response.data.Product);
    return response.data.Product;
  }
}

export default new ProductsSteps();
