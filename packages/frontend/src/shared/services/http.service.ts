import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '~shared/keys';

import { useUserStore } from '~store/user.store';

interface HttpServiceConfig {
  baseUrl?: string;
  fetchingService?: AxiosInstance;
  apiVersion?: string;
}

class HttpService {
  private baseUrl: string;
  private fetchingService: AxiosInstance;
  private apiVersion: string;

  constructor({ baseUrl = process.env.SERVER_URL, fetchingService = axios, apiVersion = 'api' }: HttpServiceConfig) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;

    this.fetchingService.interceptors.request.use((config) => {
      const { accessToken } = useUserStore.getState();
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    });
  }

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateDataToHeaderConfig(): Record<string, string | null> {
    const accessToken = JSON.parse(localStorage.getItem('user-store') || '{}').state.accessToken;
    const user = JSON.stringify(JSON.parse(localStorage.getItem('user-store') || '{}').state.user);
    
    return {
      Authorization: accessToken,
      user
    };
  }

  private extractUrlAndDataFromConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    const { data, url, ...configWithoutDataAndUrl } = config;
    return configWithoutDataAndUrl;
  }

  private handleError(error: any): void {
    throw error;
  }

  public async get<T>(config: AxiosRequestConfig, withAuth: boolean = true): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateDataToHeaderConfig(),
        };
      }
      const response: AxiosResponse<T> = await this.fetchingService.get(this.getFullApiUrl(config.url!), this.extractUrlAndDataFromConfig(config));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async post<T>(config: AxiosRequestConfig, withAuth: boolean = true): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateDataToHeaderConfig(),
        };
      }
      const response: AxiosResponse<T> = await this.fetchingService.post(this.getFullApiUrl(config.url!), config.data, this.extractUrlAndDataFromConfig(config));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async put<T>(config: AxiosRequestConfig, withAuth: boolean = true): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateDataToHeaderConfig(),
        };
      }
      const response: AxiosResponse<T> = await this.fetchingService.put(this.getFullApiUrl(config.url!), config.data, this.extractUrlAndDataFromConfig(config));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete<T>(config: AxiosRequestConfig, withAuth: boolean = true): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateDataToHeaderConfig(),
        };
      }
      const response: AxiosResponse<T> = await this.fetchingService.delete(this.getFullApiUrl(config.url!), this.extractUrlAndDataFromConfig(config));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default HttpService;
