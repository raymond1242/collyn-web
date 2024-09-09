import { Configuration, Order, OrderImage, OrderFromJSON, OrderImageFromJSON } from "./generated-api";
import { AuthApi, OrdersApi, OrderApi, CompanyApi } from "./generated-api/apis";
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

export const OrderImageApiService = (): OrderApi =>
  new OrderApi(
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

  return OrderFromJSON(await response.json());
}

export const createOrderImage = async (formData: FormData): Promise<OrderImage> => {
  const response = await fetch(`${API_BASE_URL}/order/images`, {
    method: 'POST',
    body: formData,
    headers: AuthService.getDefaultHeaders(),
  });

  return OrderImageFromJSON(await response.json());
}
