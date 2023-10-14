import { faker } from "@faker-js/faker";
import _ from "lodash";
import { expect } from "chai";
import { createdProductSchema } from "../../../data/schema/product.schema.js";
import { validateResponseWithSchema } from "../../../utils/validations/apiValidation.js";
import ProductsService from "../../../services/product.service.js";
import type { IProduct, IProductResponse } from "../../../types/products/product.types.js";
import SignInApiSteps from "../../steps/signIn/signIn.steps.js";
import Logger from "../../../utils/logger/logger.js";

describe("Product smoke API tests", () => {
  // const baseUrl = "https://aqa-course-project.app/";
  // const productsEndpoint = "api/products/";
  // const loginEndpoint = "api/login/";
  let product = {};
  let token: string;
  let id: string = "";

  beforeEach(async () => {
    product = {
      name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
      price: 100,
      amount: 2,
      manufacturer: "Apple",
      notes: "Test product",
    };

    token = await SignInApiSteps.signInAsAdminAndGetToken();
  });

  it.only("Should create product with valid data v2", async () => {
    try {
      const response = await ProductsService.create({ data: product as IProduct, token });
      id = response.data.Product._id;
      console.log(response.data);
      validateResponseWithSchema(response, 201, true, null, createdProductSchema);
      const responseProduct = _.omit(response.data.Product, ["createdOn", "_id"]);
      expect(responseProduct).to.deep.equal(product);
      const getResponse = await ProductsService.get({ token });
      const products = getResponse.data.Products;

      const isProductCreated = products.some((product: IProductResponse) => product._id === id);

      expect(isProductCreated).to.be.true;
    } catch (error) {
      throw error;
    } finally {
      Logger.sendLogsToReport();
    }
  });

  afterEach(async () => {
    await ProductsService.delete({ token, data: { _id: id } });
  });
});
