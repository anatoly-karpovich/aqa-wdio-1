import SignInSteps from "../../steps/signInSteps.steps.js";
import HomeSteps from "../../steps/homeSteps.steps.js";
import ProductsService from "../../../services/product.service.js";
import CommonSteps from "../../steps/common.steps.js";
import ProductsListSteps from "../../steps/products/productsList.steps.js";
import ProductsSteps from "../../steps/products/products.steps.js";
import { Products } from "../../../utils/entities/index.js";
import { requestAsLoggedInUser } from "../../../utils/request/requestAsLoggedInUser.js";
import allure from "@wdio/allure-reporter";
import Logger from "../../../utils/logger/logger.js";

describe("Products smoke tests", () => {
  allure.addFeature("Products");
  allure.addSuite("UI-Products");
  beforeEach(async () => {
    await CommonSteps.openSalesPortal();
  });

  it("Should edit created product", async () => {
    allure.addStory("Product Details");
    allure.addSeverity("Blocker");
    try {
      await SignInSteps.signIn();
      await ProductsSteps.createProductViaApi();
      await HomeSteps.openProductsPage();
      await ProductsListSteps.openDetailsModalForCreatedProduct(Products.getProduct().name);
      await browser.pause(1000);
    } catch (e) {
      throw e;
    } finally {
      Logger.sendLogsToReport();
    }
  });

  afterEach(async () => {
    for (const product of Products.getAllCreatedProducts()) {
      // await ProductsService.delete({ token: await CommonSteps.getAuthorizationToken(), data: { _id: product._id } });
      await requestAsLoggedInUser(ProductsService.delete, { data: { _id: product._id } });
    }
  });
});
