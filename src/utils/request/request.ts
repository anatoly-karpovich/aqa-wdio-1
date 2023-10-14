import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import type { RequestOptions } from "../../types/request/requestTypes.js";
import Logger from "../logger/logger.js";

export type Response<T = any> = Promise<AxiosResponse<T>>;

const request = axios.create();
let response: AxiosResponse;

class RequestApi {
  async sendRequest(options: RequestOptions): Response {
    options.timeout ? options.timeout : 120000;
    const requestInfoLog = `\nURL: ${options.url}\nMethod: ${options.method}\nHeaders: Autherization: ${options.headers.Authorization}\n${
      options.data ? "Body: " + JSON.stringify(options.data) : ""
    }\n`;
    Logger.logApiRequest(requestInfoLog);
    try {
      response = await request(options as AxiosRequestConfig);
      const responseInfoLog = `\nURL: ${options.url}${options.params ? options.params : ""}\nMethod: ${options.method}\nStatus: ${response.status}\n${
        response.data ? "Body: " + JSON.stringify(response.data) : ""
      }\n`;
      Logger.logApiResponse(responseInfoLog);
    } catch (err: any) {
      const responseInfoLog = `\nURL: ${options.url}\nMethod: ${options.method}\nStatus: ${err.response.status}\n${err.response.data ? "Body: " + JSON.stringify(err.response.data) : ""}\n`;
      Logger.logApiResponse(responseInfoLog);
      console.log("Error", err.isAxiosError ? err.message : err);
      console.log("Request URL:", options.method, options.url);
      return err.response;
    }
    return response;
  }
}

export default new RequestApi();
