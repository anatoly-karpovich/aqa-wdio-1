import { faker } from "@faker-js/faker";
import type { IProduct } from "../../../types/products/product.types.js";

export function generateNewProduct(customProductFields?: Partial<IProduct>) {
  const product: IProduct = {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
    price: 100,
    amount: 2,
    manufacturer: "Apple",
    notes: "Test product",
    ...customProductFields,
  };
  return product;
}
