import { faker } from "@faker-js/faker";
import _ from "lodash";
import { expect } from "chai";
import { createdProductSchema } from "../../../data/schema/product.schema.js";
import { validateResponse } from "../../../utils/validations/apiValidation.js";
import ProductsService from "../../../services/product.service.js";
import { IProduct } from "../../../ui/pages/types/product.types.js";
import SignInApiSteps from "../../steps/signIn/signIn.steps.js";

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

  // it("Should create product with valid data v1", async () => {
  //   const fullUrl = baseUrl + productsEndpoint;
  //   const response = await axios.post(fullUrl, product, {
  //     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  //   });
  //   id = response.data.Product._id;

  //   validateResponse(response, 201, true, null, createdProductSchema);

  //   const responseProduct = _.omit(response.data.Product, ["createdOn", "_id"]);
  //   expect(responseProduct).to.deep.equal(product);

  //   const getResponse = await axios.get("https://aqa-course-project.app/api/products/", { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
  //   const products = getResponse.data.Products;

  //   const isProductCreated = products.some((product) => product._id === id);

  //   expect(isProductCreated).to.be.true;
  // });

  it.only("Should create product with valid data v2", async () => {
    const response = await ProductsService.create({ data: product as IProduct, token });
    id = response.data.Product._id;
    console.log(response.data);
    validateResponse(response, 201, true, null, createdProductSchema);
    const responseProduct = _.omit(response.data.Product, ["createdOn", "_id"]);
    expect(responseProduct).to.deep.equal(product);
    const getResponse = await ProductsService.get({ token });
    const products = getResponse.data.Products;

    const isProductCreated = products.some((product) => product._id === id);

    expect(isProductCreated).to.be.true;
  });

  afterEach(async () => {
    await ProductsService.delete({ token, data: { _id: id } });
  });
});
