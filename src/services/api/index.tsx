import { Configuration } from "./generated-api";
import { AuthApi, OrdersApi, CompanyApi } from "./generated-api/apis";
import { AuthService } from "@/services/auth.service";

export * from "./generated-api";

const API_BASE_URL = process.env.API_BASE_URL;

export const AuthApiService = (): AuthApi =>
  new AuthApi(
    new Configuration({
      basePath: API_BASE_URL,
      headers: AuthService.getDefaultHeaders(),
    }),
  );

export const OrdersApiService = (): OrdersApi =>
  new OrdersApi(
    new Configuration({
      basePath: API_BASE_URL,
      headers: AuthService.getDefaultHeaders(),
    }),
  );

export const CompanyApiService = (): CompanyApi =>
  new CompanyApi(
    new Configuration({
      basePath: API_BASE_URL,
      headers: AuthService.getDefaultHeaders(),
    }),
  );
