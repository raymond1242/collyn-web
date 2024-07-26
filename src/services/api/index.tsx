import { Configuration } from "./generated-api";
import { AuthApi } from "./generated-api/apis";
import { AuthService } from "@/services/auth.service";

const API_BASE_URL = 'http://localhost:8000/api';

export const AuthApiService = (): AuthApi =>
  new AuthApi(
    new Configuration({
      basePath: API_BASE_URL,
      headers: AuthService.getDefaultHeaders(),
    }),
  );
