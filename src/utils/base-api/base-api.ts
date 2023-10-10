import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface IResponseData {
  [key: string]: any;
}

export abstract class BaseApi {
  protected http: AxiosInstance;
  //   protected abstract getAuthToken(): { header: string; token: string };
  protected abstract setAuthConfig(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig;
  // public isAuthEnabled = false;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
    });

    this.http.interceptors.request.use((config) => {
      config = this.setAuthConfig(config);

      return config;
    });
  }

  protected createRequestParams(options: object) {
    const params = {};

    Object.keys(options).forEach((optionKey) => {
      if (options[optionKey]) {
        params[optionKey] = options[optionKey];
      }
    });

    return params;
  }

  protected async get<T = IResponseData>(
    endpoint: string,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    const response = await this.http.get<T>(endpoint, { params });

    return response;
  }

  protected async post<T = IResponseData>(
    endpoint: string,
    body?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.http.post<T>(endpoint, body, requestConfig);

    return response;
  }

  protected async put<T = IResponseData>(
    endpoint: string,
    body?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.http.put<T>(endpoint, body, requestConfig);

    return response;
  }

  protected async delete<T = IResponseData>(
    endpoint: string,
    body?: object,
  ): Promise<AxiosResponse<T>> {
    const response = await this.http.delete<T>(endpoint, body);

    return response;
  }

  // Add more methods as needed (put, delete, etc)
}
