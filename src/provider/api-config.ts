import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RawAxiosRequestHeaders,
} from 'axios';
import {BASE_URL} from '../constant/api-endpoints';
import {MessageOptions, showMessage} from 'react-native-flash-message';

export const configAxiosStructure = async () => {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.timeout = 60000;
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
  };
};

export const setAuthToken = (token: any = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

class API {
  constructor() {}

  request = async <T, D = null>(
    endPoint: string,
    method: Method,
    params?: D,
    showError: boolean = true,
    options?: RawAxiosRequestHeaders,
  ): Promise<ApiResponse<T>> => {
    console.log('API - ', endPoint);
    console.log('params : ', JSON.stringify(params));

    const keyName = method == ApiMethodType.get ? 'params' : 'data';

    axios.defaults.headers.post = {
      ...axios.defaults.headers.common,
    };

    const config: AxiosRequestConfig = {
      url: endPoint,
      method: method,
      [keyName]: params,
    };
    console.log('Config - ', JSON.stringify(config));
    try {
      const res: AxiosResponse = await axios(config);
      // console.log('Res---', JSON.stringify(res));
      if (res.status === 200) {
        return {
          code: res.status,
          data: res.data,
          error: null,
        };
      } else {
        return {
          code: res?.status,
          data: null,
          error: {
            message: res.data.message,
            info: res.data,
          },
        };
      }
    } catch (err: unknown) {
      const resError = err as AxiosError<ResponseExtend>;
      console.log('reserror--', JSON.stringify(resError?.response));
      if (showError) {
        const messageInfo: MessageOptions = {
          message: 'Unknown Error',
          type: 'danger',
          position: 'top',
        };
        if (resError.response?.data) {
          messageInfo.message =
            resError?.response?.data?.message ||
            resError?.response?.data?.error ||
            resError?.response?.data?.errorDescription;
          ('Unknown Error');
        } else if (resError.message) {
          messageInfo.message = resError?.message;
        }
        showMessage(messageInfo);
      }
      return {
        code: resError.response?.data.code || 400,
        data: null,
        error: {
          message: resError.response?.data.message,
          info: resError.response,
        },
      };
    }
  };
}

export default new API();

export enum ApiMethodType {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export interface ErrorType {
  message: string | undefined;
  info?: any | null;
}

export enum ResponseCode {
  success = 'SUCCESS',
  validationError = 'VALIDATION_ERROR',
  unknown = 'UNKNOWN_ERROR',
}

export enum CodeEnum {
  success = 200,
  badRequest = 400,
  serverError = 500,
  invalidUser = 401,
}

export interface ApiResponse<DataType> {
  code: CodeEnum;
  data: DataType | null;
  error: ErrorType | null;
}

export interface ResponseExtend {
  errorDescription: string;
  error: string;
  code: CodeEnum;
  message: string;
  responseCode?: ResponseCode;
  result?: unknown | any | null;
}

export interface UserInfo {
  name: string;
  age: number;
  mobile: string;
  userId: string;
}
