import { Configuration, Order } from "./generated-api";
import { AuthApi, OrdersApi, CompanyApi } from "./generated-api/apis";
import { AuthService } from "@/services/auth.service";

export * from "./generated-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export const createOrder = async (formData: FormData): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    body: formData,
    headers: AuthService.getDefaultHeaders(),
  });

  return await response.json();
}
