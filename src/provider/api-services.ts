import API, {ApiMethodType} from './api-config';
import {EndPoints} from '../constant/api-endpoints';

/**
 * get Character List
 * @returns Api Response
 */
export const fetchCategory = async () => {
  return new Promise(async (resolve, reject) => {
    const res = await API.request<any, any>(
      EndPoints.category,
      ApiMethodType.get,
    );
    if (res.code == 200) {
      resolve(res.data);
    }
    resolve(null);
  });
};

export const fetchProduct = (params: {skip: number}) => {
  return new Promise(async (resolve, reject) => {
    const res = await API.request<any, any>(
      `${EndPoints.products}?limit=20&skip=${params.skip}`,
      ApiMethodType.get,
    );
    if (res.code == 200) {
      resolve(res.data);
    }
    resolve(null);
  });
};

export const fetchProductBySearch = (params: {searchTxt: string}) => {
  return new Promise(async (resolve, reject) => {
    const res = await API.request<any, any>(
      `${EndPoints.products}/search?q=${params.searchTxt}`,
      ApiMethodType.get,
    );
    if (res.code == 200) {
      resolve(res.data);
    }
    resolve(null);
  });
};
