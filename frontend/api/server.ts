import axios, {
  AxiosInstance,
  AxiosProgressEvent,
  ResponseType,
  isAxiosError,
} from "axios";

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  body?: any;
  headers?: { [key: string]: string };
  useAuth?: boolean;
  queryParameters?: { [key: string]: string };
  responseType?: ResponseType;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export class ApiWrapper {
  constructor(public server: AxiosInstance) {}

  async request<T>({
    method,
    url,
    body,
    headers = {},
    useAuth,
    queryParameters,
    responseType,
    onUploadProgress,
  }: RequestOptions) {
    if (useAuth) headers["Authorization"] = localStorage.getItem("token") || "";

    try {
      const response = await this.server.request<T>({
        method,
        url,
        data: body,
        headers: {
          ...headers,
          // TODO: Add auth header
        },
        params: queryParameters,
        responseType: responseType,
        onUploadProgress: onUploadProgress,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message);
      } else {
        throw new Error(`Neznámá chyba (${error})`);
      }
    }
  }
}

export const api = new ApiWrapper(server);
