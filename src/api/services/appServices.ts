import { api } from "../apiClient";
import { ENDPOINTS } from "../endpoints";

export const getQuestions = <T = any>() =>
  api.get<T>(ENDPOINTS.questions).then((r) => r.data);

export const getCategories = <T = any>() =>
  api.get<T>(ENDPOINTS.categories).then((r) => r.data?.data);
