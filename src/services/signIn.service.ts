import { apiConfig } from "../config/apiConfig.js";
import { ICredentials, RequestOptions, RequestParams } from "../types/request/requestTypes.js";
import requestApi from "../utils/request/request.js";

class SignInService {
  async login(params: RequestParams<ICredentials>) {
    const options: RequestOptions = {
      method: "post",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Login,
      headers: {},
      data: params.data,
    };
    return requestApi.sendRequest(options);
  }
}
export default new SignInService();
