import allure from "@wdio/allure-reporter";
import { RequestOptions } from "../../types/request/requestTypes";
import { AxiosResponse } from "axios";

export function logStep(stepName: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      await allure.step(stepName, async () => {
        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } catch (error) {
          throw error;
        }
      });
    };
    return descriptor;
  };
}

export function attachLog(log: string) {
  allure.addAttachment("Test Log", log, "text/plain");
}

export type ApiMethod = (options: RequestOptions) => AxiosResponse;

export function logApiStep(stepName: string): MethodDecorator {
  return (target: Record<string, any>, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (typeof descriptor.value === "function") {
      const originalMethod: ApiMethod = descriptor.value;

      descriptor.value = function (options: RequestOptions) {
        allure.step(`API Request: ${stepName}`, () => {
          allure.addAttachment("Request Options", JSON.stringify(options, null, 2), "application/json");
        });

        return originalMethod.call(this, options);
      };
    }

    return descriptor;
  };
}
