import { faker } from "@faker-js/faker";
import SignInSteps from "../../steps/signInSteps.steps.js";
import HomeSteps from "../../steps/homeSteps.steps.js";
import ProductsListSteps from "../../steps/products/productsList.steps.js";
import AddNewProductSteps from "../../steps/products/addNewProduct.steps.js";
import SignInApiSteps from "../../../api/steps/signIn/signIn.steps.js";
import ProductsService from "../../../services/product.service.js";
import { IProduct } from "../../pages/types/product.types.js";

describe("Products smoke tests", () => {
  let token: string;
  let id: string;
  const productToCreate = {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
    price: 100,
    amount: 2,
    manufacturer: "Apple",
    notes: "Test product",
  };

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url("https://anatoly-karpovich.github.io/aqa-course-project/#");
  });

  it.skip("Should create product with valid data v1", async () => {
    (await $("#emailinput")).setValue("aqacourse@gmail.com");
    (await $("#passwordinput")).setValue("password");
    await browser.pause(200);
    await $("button.btn-primary").click();
    (await $(".spinner-border")).waitForDisplayed({ reverse: true });
    (await $("#products-from-home")).click();
    (await $(".spinner-border")).waitForDisplayed({ reverse: true });
    await $("button.page-title-header").click();
    (await $(".spinner-border")).waitForDisplayed({ reverse: true });
    (await $("#inputName")).setValue(productToCreate.name);
    //Manufacturer my yourself
    (await $("#inputPrice")).setValue(productToCreate.price);
    (await $("#inputAmount")).setValue(productToCreate.amount);
    (await $("#textareaNotes")).setValue(productToCreate.notes);
    await browser.pause(200);
    (await $("#save-new-product")).click();
    (await $(".spinner-border")).waitForDisplayed({ reverse: true });
    const rowSelector = (product: string) => `//tr[./td[text()="${product}"]]`;
    const row = $(rowSelector(productToCreate.name));
    const actualName = await row.$(`//tr[./td[text()="${productToCreate.name}"]]/td[1]`).getText();
    const actualPrice = await row.$("./td[2]").getText();
    const actualManufacturer = await row.$("td:nth-of-type(3)").getText();

    expect(actualName).toBe(productToCreate.name);
    expect(actualPrice).toBe(`$${productToCreate.price}`);
    expect(actualManufacturer).toBe(productToCreate.manufacturer);
  });

  it.skip("Should create product with valid data v2", async () => {
    // //login
    // (await SignInPage["Email input"]).setValue("aqacourse@gmail.com");
    // (await SignInPage["Password input"]).setValue("password");
    // await browser.pause(200);
    // await SignInPage["Login button"].click();
    // // await SignInSteps.signIn()
    // (await HomePage.Spinner).waitForDisplayed({ reverse: true });
    // //open products
    // //await HomeSteps.openProductsPage();
    // (await HomePage["Products button"]).click();
    // (await HomePage.Spinner).waitForDisplayed({ reverse: true });
    // //open add new products
    // await ProductsListPage["Add new product button"].click();
    // await ProductsListPage.Spinner.waitForDisplayed({ reverse: true });
    // //product creation
    // (await AddNewProductPage["Name input"]).setValue(productToCreate.name);
    // //Manufacturer my yourself
    // (await AddNewProductPage["Price input"]).setValue(productToCreate.price);
    // (await AddNewProductPage["Amount input"]).setValue(productToCreate.amount);
    // (await AddNewProductPage["Notes input"]).setValue(productToCreate.notes);
    // await browser.pause(200);
    // (await AddNewProductPage["Save New Product button"]).click();
    // (await ProductsListPage.Spinner).waitForDisplayed({ reverse: true });
    // //verify created product
    // const actualName = await ProductsListPage["Name by table row"](productToCreate.name).getText();
    // const actualPrice = await ProductsListPage["Price by table row"](`${productToCreate.price}`).getText();
    // const actualManufacturer = await ProductsListPage["Manufacturer by table row"](productToCreate.manufacturer).getText();
    // expect(actualName).toBe(productToCreate.name);
    // expect(actualPrice).toBe(`$${productToCreate.price}`);
    // expect(actualManufacturer).toBe(productToCreate.manufacturer);
  });

  it.skip("Should create product with valid data v3", async () => {
    //login
    await SignInSteps.signIn();

    //open products
    await HomeSteps.openProductsPage();

    //open add new products
    await ProductsListSteps.openAddNewProductPage();

    //product creation
    await AddNewProductSteps.createProduct(productToCreate);

    //verify created product
    // const actualName = await ProductsListPage["Name by table row"](productToCreate.name).getText();
    // const actualPrice = await ProductsListPage["Price by table row"](`${productToCreate.price}`).getText();
    // const actualManufacturer = await ProductsListPage["Manufacturer by table row"](productToCreate.manufacturer).getText();

    // expect(actualName).toBe(productToCreate.name);
    // expect(actualPrice).toBe(`$${productToCreate.price}`);
    // expect(actualManufacturer).toBe(productToCreate.manufacturer);
  });

  it("Should edit created product", async () => {
    const product = {
      name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
      price: 100,
      amount: 2,
      manufacturer: "Apple",
      notes: "Test product",
    };
    token = await SignInApiSteps.signInAsAdminAndGetToken();
    const response = await ProductsService.create({ data: product as IProduct, token });
    const productName = response.data.Product.name;
    id = response.data.Product._id;
    await SignInSteps.signIn();
    await HomeSteps.openProductsPage();
  });

  afterEach(async () => {
    await ProductsService.delete({ token, data: { _id: id } });
  });
});
