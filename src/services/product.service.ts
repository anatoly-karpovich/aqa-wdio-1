import { apiConfig } from "../config/apiConfig.js";
import { IProduct } from "../ui/pages/types/product.types.js";
import requestApi from "../utils/request/request.js";
import { Id, RequestOptions, RequestParams } from "../utils/request/requestTypes.js";

class ProductsService {
  async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: "get",
      baseURL: apiConfig.baseURL,
      url: params.data ? apiConfig.endpoints["Get Product By Id"](params.data._id) : apiConfig.endpoints.Products,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
    };
    return requestApi.sendRequest(options);
  }

  async create(params: RequestParams<IProduct>) {
    const options: RequestOptions = {
      method: "post",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return requestApi.sendRequest(options);
  }

  async update(params: RequestParams<IProduct>) {
    const options: RequestOptions = {
      method: "put",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return requestApi.sendRequest(options);
  }

  async delete(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: "delete",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints["Product By Id"](params.data._id),
      headers: { Authorization: `Bearer ${params.token}` },
    };
    return requestApi.sendRequest(options);
  }
}

export default new ProductsService();
